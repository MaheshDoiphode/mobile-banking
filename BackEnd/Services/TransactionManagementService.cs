using Microsoft.EntityFrameworkCore;
using Mobile_Banking_V1.Data;
using Mobile_Banking_V1.Models;
using Mobile_Banking_V1.Repository;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mobile_Banking_V1.Services
{
    public class TransactionManagementService : ITransactionManagementService
    {
        private readonly IUserManagementRepository _userManagementRepository;
        private readonly ITransactionManagementRepository _transactionManagementRepository;
        private readonly MongoDbService _mongoDbService;
        private BankingDbContext _context;

        public TransactionManagementService(BankingDbContext context, ITransactionManagementRepository transactionManagementRepository, IUserManagementRepository userManagementRepository, MongoDbService mongoDbService)
        {
            _transactionManagementRepository = transactionManagementRepository;
            _userManagementRepository = userManagementRepository;
            _mongoDbService = mongoDbService;
            _context = context;
        }

        public async Task<string> CreateTransaction(TransactionRequest transactionRequest)
        {
            var transactions = new List<Transaction>();
            string lastTransactionStatus = "";
            string lastErrorDescription = "";

            foreach (var transaction1 in transactionRequest.Transactions)
            {
                var transaction = new Transaction
                {
                    TransactionID = Guid.NewGuid().ToString(),
                    UserID = transactionRequest.UserID, // Sender is the user who initiated the transaction
                    PaymentType = transaction1.PaymentType,
                    AccountNumber = transaction1.AccountNumber, // Receiver's account number
                    Amount = -transaction1.Amount, // Amount is negative as it's being deducted from sender's account
                    Status = "Pending",
                    ErrorDescription = "",
                    Timestamp = DateTime.Now,
                    RemainingBalance = 0 // This will be updated later
                };

                // Check if the sender exists
                var senderAccount = await _context.UserAccountDetails.FirstOrDefaultAsync(u => u.UserID == transactionRequest.UserID);
                if (senderAccount == null)
                {
                    // Sender does not exist
                    transaction.Status = "Failed";
                    transaction.ErrorDescription = "Sender does not exist.";
                    transaction.RemainingBalance = senderAccount.Balance;
                    transactions.Add(transaction);
                    continue;
                }

                // Check if the receiver exists
                var receiverAccount = await _context.UserAccountDetails.FirstOrDefaultAsync(ua => ua.UserID == transaction1.ReceiverID);
                if (receiverAccount == null)
                {
                    // Receiver does not exist
                    transaction.Status = "Failed";
                    transaction.ErrorDescription = "Receiver does not exist.";
                    transaction.RemainingBalance = senderAccount.Balance;
                    transactions.Add(transaction);
                    continue;
                }

                // Check if the sender and receiver are the same
                if (transactionRequest.UserID == transaction1.ReceiverID)
                {
                    // Sender and receiver are the same
                    transaction.Status = "Failed";
                    transaction.ErrorDescription = "Sender and receiver cannot be the same.";
                    transaction.RemainingBalance = senderAccount.Balance;
                    transactions.Add(transaction);
                    continue;
                }

                // Check if the transaction amount is valid
                if (transaction1.Amount <= 0)
                {
                    // Transaction amount is not valid
                    transaction.Status = "Failed";
                    transaction.ErrorDescription = "Transaction amount must be greater than zero.";
                    transaction.RemainingBalance = senderAccount.Balance;
                    transactions.Add(transaction);
                    continue;
                }

                // Check if the sender has sufficient balance
                if (senderAccount.Balance < transaction1.Amount)
                {
                    // Sender has insufficient balance
                    transaction.Status = "Failed";
                    transaction.ErrorDescription = "Sender has insufficient balance.";
                    transaction.RemainingBalance = senderAccount.Balance;
                    transactions.Add(transaction);
                    continue;
                }
                // Check if the receiver exists and the account number and IFSC code are valid
                var receiverAccountCheck = await _context.UserAccountDetails.FirstOrDefaultAsync(ua => ua.UserID == transaction1.ReceiverID && ua.AccountNumber == transaction1.AccountNumber && ua.IFSCCode == transaction1.IFSCCode);
                if (receiverAccountCheck == null)
                {
                    // If the receiver does not exist or the account number or IFSC code is invalid, fail the transaction
                    transaction.Status = "Failed";
                    transaction.ErrorDescription = "Transaction failed due to invalid receiver account number or IFSC code.";
                    transaction.RemainingBalance = senderAccount.Balance; 
                    transactions.Add(transaction);
                    continue; // Skip to the next transaction
                }


                // Update UserAccountDetailsS for sender
                senderAccount.Balance -= transaction1.Amount; // Decrease sender's balance
                _context.UserAccountDetails.Update(senderAccount);
                await _context.SaveChangesAsync();

                transaction.RemainingBalance = senderAccount.Balance;
                // Update UserAccountDetailsS for receiver
                receiverAccount.Balance += transaction1.Amount; // Increase receiver's balance
                _context.UserAccountDetails.Update(receiverAccount);
                await _context.SaveChangesAsync();

                // If the transaction was successful, update the status
                transaction.Status = "Successful";

                // Create a new transaction for the receiver
                var receiverTransaction = new Transaction
                {
                    TransactionID = transaction.TransactionID, // Use the same transaction ID
                    UserID = transaction1.ReceiverID, // The user is the receiver
                    PaymentType = transaction.PaymentType,
                    AccountNumber = transactionRequest.UserID, // The account number is the sender's user ID
                    Amount = transaction1.Amount, // The amount is positive as it's being added to the receiver's account
                    Status = transaction.Status,
                    ErrorDescription = transaction.ErrorDescription,
                    Timestamp = transaction.Timestamp,
                    RemainingBalance = receiverAccount.Balance // The remaining balance is the receiver's balance
                };

                // Update TransactionDetailsM for receiver
                var receiverTransactionDetails = await _mongoDbService.TransactionDetails.Find(td => td.AccountID == transaction1.ReceiverID).FirstOrDefaultAsync();
                if (receiverTransactionDetails == null)
                {
                    receiverTransactionDetails = new TransactionDetailsM
                    {
                        AccountID = transaction1.ReceiverID,
                        Transactions = new List<Transaction> { receiverTransaction }
                    };
                    await _mongoDbService.TransactionDetails.InsertOneAsync(receiverTransactionDetails);
                }
                else
                {
                    receiverTransactionDetails.Transactions.Add(receiverTransaction);
                    await _mongoDbService.TransactionDetails.ReplaceOneAsync(td => td.AccountID == transaction1.ReceiverID, receiverTransactionDetails);
                }

                // Update CategoriesM for sender
                var senderCategories = await _mongoDbService.Categories.Find(c => c.AccountID == transactionRequest.UserID).FirstOrDefaultAsync();
                if (senderCategories == null)
                {
                    senderCategories = new CategoriesM
                    {
                        AccountID = transactionRequest.UserID,
                        Categories = new Dictionary<string, List<Transaction>>()
                    };
                }
                var category = GetRandomCategory(); // This method should return a random category
                if (senderCategories.Categories.ContainsKey(category))
                {
                    senderCategories.Categories[category].Add(transaction);
                }
                else
                {
                    senderCategories.Categories[category] = new List<Transaction> { transaction };
                }
                await _mongoDbService.Categories.ReplaceOneAsync(c => c.AccountID == transactionRequest.UserID, senderCategories, new ReplaceOptions { IsUpsert = true });

                // Update Frequency for sender
                var senderFrequency = await _mongoDbService.Frequency.Find(f => f.AccountID == transactionRequest.UserID).FirstOrDefaultAsync();
                if (senderFrequency == null)
                {
                    senderFrequency = new FrequencyM
                    {
                        AccountID = transactionRequest.UserID,
                        Favorite = new List<string>(),
                        Frequencies = new Dictionary<string, int>()
                    };
                }
                if (senderFrequency.Frequencies.ContainsKey(transaction1.ReceiverID))
                {
                    senderFrequency.Frequencies[transaction1.ReceiverID]++;
                }
                else
                {
                    senderFrequency.Frequencies[transaction1.ReceiverID] = 1;
                }
                UpdateFavouriteList(senderFrequency); // This method should update the favourite list based on the frequencies
                await _mongoDbService.Frequency.ReplaceOneAsync(f => f.AccountID == transactionRequest.UserID, senderFrequency, new ReplaceOptions { IsUpsert = true });

                transactions.Add(transaction);
                lastTransactionStatus = transaction.Status;
                lastErrorDescription = transaction.ErrorDescription;
            }

            var transactionDetails = await _mongoDbService.TransactionDetails.Find(td => td.AccountID == transactionRequest.UserID).FirstOrDefaultAsync();
            if (transactionDetails == null)
            {
                transactionDetails = new TransactionDetailsM
                {
                    AccountID = transactionRequest.UserID,
                    Transactions = transactions
                };
                await _mongoDbService.TransactionDetails.InsertOneAsync(transactionDetails);
            }
            else
            {
                transactionDetails.Transactions.AddRange(transactions);
                await _mongoDbService.TransactionDetails.ReplaceOneAsync(td => td.AccountID == transactionRequest.UserID, transactionDetails);
            }

            if (lastTransactionStatus == "Successful")
            {
                return "Transaction is successful.";
            }
            else
            {
                return lastErrorDescription;
            }
        }

        public async Task<Transaction> GetTransaction(string transactionId)
        {
            var filter = Builders<TransactionDetailsM>.Filter.Empty; // get all documents
            var transactionDetailsList = await _mongoDbService.TransactionDetails.Find(filter).ToListAsync();

            foreach (var transactionDetails in transactionDetailsList)
            {
                var transaction = transactionDetails.Transactions.FirstOrDefault(t => t.TransactionID == transactionId);
                if (transaction != null)
                {
                    return transaction;
                }
            }

            return null; // return null if no transaction with the given ID is found
        }

        public async Task<List<Transaction>> GetAllTransactions(string userId)
        {
            return await _transactionManagementRepository.GetAllTransactions(userId);
        }

        // Extra method

        private string GenerateTransactionID()
        {
            Random rd = new Random();
            int id = rd.Next(1, 9999);
            return id.ToString();
        }
        private string GetRandomCategory()
        {
            var categories = new List<string> { "Groceries", "Transport", "Entertainment", "Others" };
            var random = new Random();
            int index = random.Next(categories.Count);
            return categories[index];
        }

        private void UpdateFavouriteList(FrequencyM frequency)
        {
            var top5 = new List<string>(frequency.Favorite);
            foreach (var item in frequency.Frequencies)
            {
                if (top5.Count < 5)
                {
                    top5.Add(item.Key);
                }
                else
                {
                    for (int i = 0; i < top5.Count; i++)
                    {
                        if (frequency.Frequencies[top5[i]] < item.Value)
                        {
                            top5[i] = item.Key;
                            break;
                        }
                    }
                }
            }
            frequency.Favorite = top5;
        }
    }
}
