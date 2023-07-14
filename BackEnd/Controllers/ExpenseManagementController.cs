using Microsoft.AspNetCore.Mvc;
using Mobile_Banking_V1.Models;
using Mobile_Banking_V1.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mobile_Banking_V1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseManagementController : ControllerBase
    {
        private readonly IExpenseManagementService _expenseManagementService;

        public ExpenseManagementController(IExpenseManagementService expenseManagementService)
        {
            _expenseManagementService = expenseManagementService;
        }

        // GET: api/ExpenseManagement/ExpensesByCategory/{userId}/{categoryName}
        [HttpGet("ExpensesByCategory/{userId}/{categoryName}")]
        public async Task<ActionResult<List<Transaction>>> GetExpensesByCategory(string userId, string categoryName)
        {
            var transactions = await _expenseManagementService.GetExpensesByCategory(userId, categoryName);
            if (transactions == null)
            {
                return NotFound();
            }
            return transactions;
        }

        // GET: api/ExpenseManagement/Favourites/{userId}
        [HttpGet("Favourites/{userId}")]
        public async Task<ActionResult<List<string>>> GetFavourites(string userId)
        {
            var favourites = await _expenseManagementService.GetFavourites(userId);
            if (favourites == null)
            {
                return NotFound();
            }
            return favourites;
        }

        [HttpGet]
        public async Task<List<KeyValuePair<string, int>>> GetAllCategories(string userId)
        {
            try
            {
                return await _expenseManagementService.GetAllCategory(userId);

            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
