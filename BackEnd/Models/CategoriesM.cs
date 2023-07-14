using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Mobile_Banking_V1.Models
{
    public class CategoriesM
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string AccountID { get; set; }
        public Dictionary<string, List<Transaction>> Categories { get; set; }
    }
}
