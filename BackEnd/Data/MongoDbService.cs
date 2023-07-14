using Microsoft.Extensions.Options;
using Mobile_Banking_V1.Models;
using MongoDB.Driver;

namespace Mobile_Banking_V1.Data
{
    public class MongoDbService
    {
        private readonly IMongoDatabase _database;
        private readonly MongoDbSettings _settings;

        public MongoDbService(IOptions<MongoDbSettings> settings)
        {
            _settings = settings.Value;
            var client = new MongoClient(_settings.ConnectionString);
            _database = client.GetDatabase(_settings.DatabaseName);
        }

        public IMongoCollection<TransactionDetailsM> TransactionDetails =>
            _database.GetCollection<TransactionDetailsM>(_settings.TransactionDetailsCollectionName);

        public IMongoCollection<CategoriesM> Categories =>
            _database.GetCollection<CategoriesM>(_settings.CategoriesCollectionName);

        public IMongoCollection<FrequencyM> Frequency =>
            _database.GetCollection<FrequencyM>(_settings.FrequencyCollectionName);
    }
}
