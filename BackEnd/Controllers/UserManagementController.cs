using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Mobile_Banking_V1.Models;
using Mobile_Banking_V1.Services;
using System.Threading.Tasks;

namespace Mobile_Banking_V1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserManagementController : ControllerBase
    {
        private readonly IUserManagementService _userManagementService;

        public UserManagementController(IUserManagementService userManagementService)
        {
            _userManagementService = userManagementService;
        }

        [HttpPost("RegisterUser")]
        public async Task<IActionResult> RegisterUser([FromBody] UserDetailsS user)
        {
            var result = await _userManagementService.RegisterUser(user);
            return Ok(result);
        }


        [HttpPost("LoginUser")]
        public async Task<IActionResult> LoginUser([FromBody] LoginRequest loginRequest)
        {
            var result = await _userManagementService.LoginUser(loginRequest);
            
            return Ok(result);
        }

        [HttpPost("VerifyOTP")]
        public IActionResult VerifyOTP([FromQuery] string JWT, [FromQuery] string otp)
        {
            bool isOTPVerified = _userManagementService.VerifyOTP(JWT, otp);

            if (isOTPVerified)
            {
                return Ok("Valid" );
            }
            else
            {
                return BadRequest("Invalid OTP");
            }
        }

        [HttpGet("GetUserDetails/{userId}")]
        public async Task<IActionResult> GetUserDetails(string userId)
        {
            var result = await _userManagementService.GetUserDetails(userId);
            return Ok(result);
        }

        [HttpGet("GetAccountDetails/{userId}")]
        public async Task<IActionResult> GetAccountDetails(string userId)
        {
            var accounts = await _userManagementService.GetAccountDetails(userId);
            return Ok(accounts);
        }


        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UserDetailsS user)
        {
            var existingUser = await _userManagementService.GetUserDetails(user.UserID);

            if (existingUser == null)
            {
                return NotFound("User not found");
            }

            existingUser.Name = user.Name;
            existingUser.Email = user.Email;
            existingUser.PhoneNumber = user.PhoneNumber;
            existingUser.Gender = user.Gender;
            existingUser.Address = user.Address;
            existingUser.DateOfBirth = user.DateOfBirth;
            existingUser.Nationality = user.Nationality;
            existingUser.ProfilePhoto = user.ProfilePhoto;

            var result = await _userManagementService.UpdateUser(existingUser);

            /* var properties = typeof(UserDetailsS).GetProperties();
            foreach (var property in properties)
            {
                if (property.GetValue(user) == null)
                {
                    property.SetValue(user, property.GetValue(existingUser));
                }
            }*/
            return Ok(result);
        }


        [HttpPost("LogoutUser")]
        public async Task<IActionResult> LogoutUser([FromBody] string userId)
        {
            await _userManagementService.LogoutUser(userId);
            return Ok("It's great to LogOUT When done. !!!");
        }
    }
}
