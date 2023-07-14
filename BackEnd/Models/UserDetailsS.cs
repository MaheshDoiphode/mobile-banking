using System.ComponentModel.DataAnnotations;

namespace Mobile_Banking_V1.Models
{
    public class UserDetailsS
    {
        [Key]
        public string UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Nationality { get; set; }
        public string ProfilePhoto { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string RegistrationIP { get; set; }
    }
}
