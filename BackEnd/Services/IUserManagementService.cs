using Mobile_Banking_V1.Models;
using System.Threading.Tasks;

namespace Mobile_Banking_V1.Services
{
    public interface IUserManagementService
    {
        Task<UserDetailsS> RegisterUser(UserDetailsS user);
        Task<Object> LoginUser(LoginRequest loginRequest);
        bool VerifyOTP(string userID, string otp);
        Task<UserDetailsS> GetUserDetails(string userId);
        Task<List<UserAccountDetailsS>> GetAccountDetails(string userId);
        Task<UserDetailsS> UpdateUser(UserDetailsS user);
        Task LogoutUser(string userId);
    }
}
