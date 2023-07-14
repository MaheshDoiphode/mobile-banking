using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Mobile_Banking_V1.Models
{
    public class TransactionDetailsM
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string AccountID { get; set; }
        public List<Transaction> Transactions { get; set; }
    }
}
