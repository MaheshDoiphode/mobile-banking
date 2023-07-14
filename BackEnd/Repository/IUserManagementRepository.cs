using Mobile_Banking_V1.Models;

namespace Mobile_Banking_V1.Repository
{
    public interface IUserManagementRepository
    {
        Task<UserDetailsS> AddUser(UserDetailsS user);
        Task<UserDetailsS> GetUser(string userId);
        Task<UserDetailsS> GetUserByEmail(string email);
        Task<UserDetailsS> UpdateUser(UserDetailsS user);
        string GetOTP(string userID);

        Task<UserLoginDetailsS> AddLoginDetails(UserLoginDetailsS loginDetails);
        Task<UserLoginDetailsS> UpdateLoginDetails(UserLoginDetailsS loginDetails);
        Task<List<UserAccountDetailsS>> GetAccountDetails(string userId);
        Task<UserLoginDetailsS> GetLoginDetails(string userId);
    }

}
