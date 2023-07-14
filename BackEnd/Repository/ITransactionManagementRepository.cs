using Mobile_Banking_V1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mobile_Banking_V1.Repository
{
    public interface ITransactionManagementRepository
    {
        Task<TransactionDetailsM> AddTransactions(string userId, List<Transaction> transactions);
        Task<Transaction> GetTransaction(string transactionId);
        Task<List<Transaction>> GetAllTransactions(string userId);
    }
}
