namespace Mobile_Banking_V1.Data
{
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string TransactionDetailsCollectionName { get; set; }
        public string CategoriesCollectionName { get; set; }
        public string FrequencyCollectionName { get; set; }
    }

}
