using Microsoft.AspNetCore.Mvc;
using Mobile_Banking_V1.Models;
using Mobile_Banking_V1.Services;
using System.Threading.Tasks;

namespace Mobile_Banking_V1.Controllers
{
    [ApiController]
    [Route("api/transaction")]
    public class TransactionManagementController : ControllerBase
    {
        private readonly ITransactionManagementService _transactionManagementService;

        public TransactionManagementController(ITransactionManagementService transactionManagementService)
        {
            _transactionManagementService = transactionManagementService;
        }

        // POST api/transaction/create
        [HttpPost("create")]
        public async Task<ActionResult<string>> CreateTransaction([FromBody] TransactionRequest transactionRequest)
        {
            var result = await _transactionManagementService.CreateTransaction(transactionRequest);
            return Ok(result.ToString());
        }


        // GET api/transaction/{transactionId}
        [HttpGet("{transactionId}")]
        public async Task<IActionResult> GetTransaction(string transactionId)
        {
            var result = await _transactionManagementService.GetTransaction(transactionId);
            return Ok(result);
        }

        // GET api/transaction/all/{userId}
        [HttpGet("all/{userId}")]
        public async Task<IActionResult> GetAllTransactions(string userId)
        {
            var result = await _transactionManagementService.GetAllTransactions(userId);
            return Ok(result);
        }
    }
}
