using Mobile_Banking_V1.Models;

namespace Mobile_Banking_V1.Repository
{
    public interface IExpenseManagementRepository
    {
        Task<List<Transaction>> GetExpensesByCategory(string userId, string categoryName);
        Task<List<string>> GetFavourites(string userId);

        Task<List<KeyValuePair<string, int>>> GetAllCategory(string userId);
    }

}
