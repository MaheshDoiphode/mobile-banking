using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Mobile_Banking_V1.Models
{
    public class FrequencyM
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string AccountID { get; set; }
        public List<string> Favorite { get; set; }
        public Dictionary<string, int> Frequencies { get; set; }
    }
}
