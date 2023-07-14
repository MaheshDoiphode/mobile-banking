using Mobile_Banking_V1.Data;
using Mobile_Banking_V1.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mobile_Banking_V1.Repository
{
    public class ExpenseManagementRepository : IExpenseManagementRepository
    {
        private readonly MongoDbService _mongoDbService;

        public ExpenseManagementRepository(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        public async Task<List<Transaction>> GetExpensesByCategory(string userId, string categoryName)
        {
            var filter = Builders<CategoriesM>.Filter.Eq("AccountID", userId);
            var categories = await _mongoDbService.Categories.Find(filter).FirstOrDefaultAsync();
            return categories?.Categories[categoryName];
        }

        public async Task<List<string>> GetFavourites(string userId)
        {
            var filter = Builders<FrequencyM>.Filter.Eq("AccountID", userId);
            var frequency = await _mongoDbService.Frequency.Find(filter).FirstOrDefaultAsync();
            return frequency?.Favorite;
        }

        public async Task<List<KeyValuePair<string,int>>> GetAllCategory(string userId)
        {
            var filter = Builders<CategoriesM>.Filter.Eq("AccountID", userId);
            var categories = await _mongoDbService.Categories.Find(filter).FirstOrDefaultAsync();

            List<KeyValuePair<string, int>> categoryWithCount = new();

            Object obj = new();

            foreach(var x in categories.Categories)
            {
                
                categoryWithCount.Add(new KeyValuePair<string, int>(x.Key.ToString(), x.Key.Length));
            }

            return categoryWithCount;
        }
    }
}
