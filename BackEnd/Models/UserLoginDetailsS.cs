using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Mobile_Banking_V1.Models
{
    public class UserLoginDetailsS
    {
        [Key]
        public int LoginID { get; set; }
        [ForeignKey("UserID")]
        public string UserID { get; set; }
        public DateTime LoginTime { get; set; }
        public DateTime LogoutTime { get; set; }
        public string JWToken { get; set; }
        public DateTime OTPGenerationTime { get; set; }
        public string SecretKey { get; set; }
        public string IPAddress { get; set; }
    }
}
