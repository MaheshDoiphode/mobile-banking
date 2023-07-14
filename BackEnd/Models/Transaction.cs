namespace Mobile_Banking_V1.Models
{
    public class Transaction
    {
        public string TransactionID { get; set; }
        public string UserID { get; set; }
        public string PaymentType { get; set; }
        public string AccountNumber { get; set; }
        public double Amount { get; set; }
        public string Status { get; set; }
        public string ErrorDescription { get; set; }
        public DateTime Timestamp { get; set; }
        public double RemainingBalance { get; set; }
    }
}
