using Mobile_Banking_V1.Models;
using Mobile_Banking_V1.Repository;
using System.Text;

namespace Mobile_Banking_V1.Services
{
    public class UserManagementService : IUserManagementService
    {
        private readonly IUserManagementRepository _userManagementRepository;

        public UserManagementService(IUserManagementRepository userManagementRepository)
        {
            _userManagementRepository = userManagementRepository;
        }

        public async Task<UserDetailsS> RegisterUser(UserDetailsS user)
        {
            Random rd = new Random();
            user.UserID = user.Name + (rd.NextDouble() + DateTime.Now.Minute + DateTime.Now.Second);
            return await _userManagementRepository.AddUser(user);
        }



        public async Task<Object> LoginUser(LoginRequest loginRequest)
        {
            var user = await _userManagementRepository.GetUserByEmail(loginRequest.Email);

            if (user == null || user.Password != loginRequest.Password)
            {
                throw new Exception("Invalid credentials");
            }
            var gToken = GenerateToken(user);
            var loginDetails = new UserLoginDetailsS
            {
                UserID = user.UserID,
                LoginTime = DateTime.Now,
                JWToken = gToken,
                OTPGenerationTime = GenerateOTP(), 
                SecretKey = GenerateSecretKey(),
                IPAddress = loginRequest.RegistrationIP
            };

            await _userManagementRepository.AddLoginDetails(loginDetails);
            var finalUser = new
            {
                user.UserID,
                user.Name,
                user.Email,
                user.Password,
                user.PhoneNumber,
                user.Address,
                user.DateOfBirth,
                user.Gender,
                user.Nationality,
                JWT = gToken,
                user.ProfilePhoto
            };
            return finalUser;
        }
       
        
        
        public bool VerifyOTP(string JWT, string otp)
        {
           
            string storedOTP = _userManagementRepository.GetOTP(JWT);

            return string.Equals(storedOTP, otp, StringComparison.OrdinalIgnoreCase);
        }


        public async Task<UserDetailsS> GetUserDetails(string userId)
        {
            return await _userManagementRepository.GetUser(userId);
        }

        public async Task<List<UserAccountDetailsS>> GetAccountDetails(string userId)
        {
            return await _userManagementRepository.GetAccountDetails(userId);
        }
        


        public async Task<UserDetailsS> UpdateUser(UserDetailsS user)
        {
            return await _userManagementRepository.UpdateUser(user);
        }

        public async Task LogoutUser(string userId)
        {
            var loginDetails = await _userManagementRepository.GetLoginDetails(userId);

            if (loginDetails == null)
            {
                throw new Exception("User is not logged in");
            }

            loginDetails.LogoutTime = DateTime.Now;

            await _userManagementRepository.UpdateLoginDetails(loginDetails);
        }



        // Extra methods

        private string GenerateToken(UserDetailsS user)
        {
            Random rd = new Random();
            var token = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{rd.NextInt64()}:{rd.NextDouble()}:{DateTime.Now}"));
            return token;
        }

        private DateTime GenerateOTP()
        {
            Random rd = new Random();
            int randomMinutes = rd.Next(1, 10);
            return DateTime.Now.AddMinutes(randomMinutes);
        }

        private string GenerateSecretKey()
        {
            Random rd = new Random();
            int key = rd.Next(1, 9999);
            return key.ToString();
        }

        
    }


}
