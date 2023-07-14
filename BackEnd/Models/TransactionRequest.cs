namespace Mobile_Banking_V1.Models
{
    public class TransactionRequest
    {
        public string UserID // the id of user sending the money
        { get; set; }

        public List<Transaction1> Transactions { get; set; }
    }

    public class Transaction1
    {
        public string ReceiverID // id of the user receiving the money 
        { get; set; }
        public string AccountNumber // account number of the user receiving the money
        { get; set; }
        public float Amount { get; set; }
        public string IFSCCode { get; set; }

        public string PaymentType { get; set; }
    }

}
