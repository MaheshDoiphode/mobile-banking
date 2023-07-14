export interface TransactionDetail {
    accountID?: string;
    transactions?: TransactionInfo[];
  }
  
  export interface TransactionInfo {
    transactionID?: string;
    receiverID?: number;
    paymentType?: string;
    amount?: number;
    status?: string;
    errorDescription?: string;
    timestamp?: Date;
    remainingBalance?: number;
  }
  
  export interface Category {
    accountId: string;
    categories: Record<string, Transaction[]>;
  }
  
  export interface Transaction {
    transactionId: string;
    amount: number;
    timestamp: Date;
  }
  