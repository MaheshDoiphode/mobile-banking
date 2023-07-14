using Mobile_Banking_V1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mobile_Banking_V1.Services
{
    public interface ITransactionManagementService
    {
        Task<string> CreateTransaction(TransactionRequest transactionRequest);
        Task<Transaction> GetTransaction(string transactionId);
        Task<List<Transaction>> GetAllTransactions(string userId);
    }
}
