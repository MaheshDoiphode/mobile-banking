using Mobile_Banking_V1.Models;
using Mobile_Banking_V1.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mobile_Banking_V1.Services
{
    public class ExpenseManagementService : IExpenseManagementService
    {
        private readonly IExpenseManagementRepository _expenseManagementRepository;

        public ExpenseManagementService(IExpenseManagementRepository expenseManagementRepository)
        {
            _expenseManagementRepository = expenseManagementRepository;
        }

        public async Task<List<Transaction>> GetExpensesByCategory(string userId, string categoryName)
        {
            return await _expenseManagementRepository.GetExpensesByCategory(userId, categoryName);
        }

        public async Task<List<string>> GetFavourites(string userId)
        {
            return await _expenseManagementRepository.GetFavourites(userId);
        }

        public async Task<List<KeyValuePair<string, int>>> GetAllCategory(string userId)
        {
            try
            {
                return await _expenseManagementRepository.GetAllCategory(userId);
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}
