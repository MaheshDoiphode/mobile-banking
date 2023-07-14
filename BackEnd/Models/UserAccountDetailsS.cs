using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Mobile_Banking_V1.Models
{
    public class UserAccountDetailsS
    {
        [Key, Column(Order = 0)]
        public string AccountID { get; set; }
        [Key, Column(Order = 1)]
        public string PhoneNumber { get; set; }
        [ForeignKey("UserID")]
        public string UserID { get; set; }
        public string AccountNumber { get; set; }
        public float Balance { get; set; }
        public string AccountType { get; set; }
        public string BankName { get; set; }
        public string IFSCCode { get; set; }
        public string BranchAddress { get; set; }
    }
}
