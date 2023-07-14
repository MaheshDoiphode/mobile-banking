using Mobile_Banking_V1.Data;
using Mobile_Banking_V1.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mobile_Banking_V1.Repository
{
    public class TransactionManagementRepository : ITransactionManagementRepository
    {
        private readonly BankingDbContext _context;
        private readonly MongoDbService _mongoDbService;

        public TransactionManagementRepository(BankingDbContext context, MongoDbService mongoDbService)
        {
            _context = context;
            _mongoDbService = mongoDbService;
        }

        public async Task<TransactionDetailsM> AddTransactions(string userId, List<Transaction> transactions)
        {
            var transactionDetails = new TransactionDetailsM
            {
                AccountID = userId,
                Transactions = transactions
            };

            await _mongoDbService.TransactionDetails.InsertOneAsync(transactionDetails);

            return transactionDetails;
        }

























        public async Task<Transaction> GetTransaction(string transactionId)
        {
            var transactionDetails = await _mongoDbService.TransactionDetails
                .FindAsync(t => t.Transactions.Exists(tr => tr.TransactionID == transactionId));

            return transactionDetails.FirstOrDefault()?.Transactions
                .Find(tr => tr.TransactionID == transactionId);
        }

        public async Task<List<Transaction>> GetAllTransactions(string userId)
        {
            var transactionDetails = await _mongoDbService.TransactionDetails
                .FindAsync(t => t.AccountID == userId);

            return transactionDetails.FirstOrDefault()?.Transactions;
        }
    }
}
