using Mobile_Banking_V1.Models;

namespace Mobile_Banking_V1.Services
{
    public interface IExpenseManagementService
    {
        Task<List<Transaction>> GetExpensesByCategory(string userId, string categoryName);
        Task<List<string>> GetFavourites(string userId);

        Task<List<KeyValuePair<string, int>>> GetAllCategory(string userId);
    }

}