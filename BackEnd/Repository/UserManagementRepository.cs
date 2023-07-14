using Microsoft.EntityFrameworkCore;
using Mobile_Banking_V1.Data;
using Mobile_Banking_V1.Models;

namespace Mobile_Banking_V1.Repository
{
    public class UserManagementRepository : IUserManagementRepository
    {
        private readonly BankingDbContext _context;

        public UserManagementRepository(BankingDbContext context)
        {
            _context = context;
        }

        public async Task<UserDetailsS> AddUser(UserDetailsS user)
        {
            _context.UserDetails.Add(user);
            var accounts = _context.UserAccountDetails.Where(u => u.PhoneNumber == user.PhoneNumber).ToList();
            foreach (var account in accounts) {
                account.UserID = user.UserID;
                _context.Entry(account).State = EntityState.Modified;
            }
            await _context.SaveChangesAsync();
            return user;
        }


        public async Task<UserDetailsS> GetUser(string userID)
        {
            return await _context.UserDetails.FirstOrDefaultAsync(u => u.UserID == userID);
        }
        public async Task<UserDetailsS> GetUserByEmail(string mail)
        {
            return await _context.UserDetails.FirstOrDefaultAsync(u => u.Email == mail);
        }

        public async Task<List<UserAccountDetailsS>> GetAccountDetails(string userId)
        {
            var accounts = await _context.UserAccountDetails
                .Where(ua => ua.UserID == userId)
                .ToListAsync();
            return accounts;
        }

        public string GetOTP(string JWT)
        {
            var userDetails = _context.UserLoginDetails.FirstOrDefault(u => u.JWToken == JWT);
            return userDetails?.SecretKey;
        }


        public async Task<UserDetailsS> UpdateUser(UserDetailsS user)
        {
            _context.UserDetails.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<UserLoginDetailsS> AddLoginDetails(UserLoginDetailsS loginDetails)
        {
            _context.UserLoginDetails.Add(loginDetails);
            await _context.SaveChangesAsync();
            return loginDetails;
        }

        public async Task<UserLoginDetailsS> GetLoginDetails(string userId)
        {
            return await _context.UserLoginDetails
                .Where(uld => uld.UserID == userId)
                .OrderByDescending(uld => uld.LoginTime)
                .FirstOrDefaultAsync();
        }

        public async Task<UserLoginDetailsS> UpdateLoginDetails(UserLoginDetailsS loginDetails)
        {
            _context.UserLoginDetails.Update(loginDetails);
            await _context.SaveChangesAsync();
            return loginDetails;
        }
    }


}
