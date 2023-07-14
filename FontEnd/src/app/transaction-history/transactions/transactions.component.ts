// import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { UserService } from 'src/app/services/user.service';

// export interface Transaction {
//   transactionID: string;
//   userID: string;
//   paymentType: string;
//   accountNumber: string;
//   amount: number;
//   status: string;
//   errorDescription: string;
//   timestamp: string;
//   remainingBalance: number;
// }

// @Component({
//   selector: 'app-transactions',
//   templateUrl: './transactions.component.html',
//   styleUrls: ['./transactions.component.css'],
// })
// export class TransactionsComponent implements OnInit {
//   constructor(private http: HttpClient, private userService: UserService) {}

//   ngOnInit(): void {
//     this.fetchData(this.userService.userValue.userID);
//   }

//   @ViewChild('pdfContent') pdfContent!: ElementRef;
//   displayData: any[] = [];


//   transactionDetails: Transaction[] = [];

//   filterType = 'All';
// sortType = 'dateDesc';

// filterTransactions(): void {
//   if (this.filterType === 'All') {
//     this.showData();
//   } else {
//     this.displayData = this.transactionDetails
//       .filter(transaction => transaction.paymentType === this.filterType)
//       .map(transaction => this.mapTransactionToDisplayData(transaction));
//   }
//   this.sortTransactions();
// }

// sortTransactions(): void {
//   this.displayData.sort((a, b) => {
//     switch (this.sortType) {
//       case 'amountAsc':
//         return a.Amount - b.Amount;
//       case 'amountDesc':
//         return b.Amount - a.Amount;
//       case 'dateAsc':
//         return new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime();
//       case 'dateDesc':
//         return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
//       default:
//         return 0;
//     }
//   });
// }


// mapTransactionToDisplayData(transaction: Transaction): any {
//   return {
//     'Transaction ID': transaction.transactionID,
//     'Receiver ID': transaction.userID,
//     'Payment Type': transaction.paymentType,
//     Amount: transaction.amount,
//     Status: transaction.status,
//     'Error Description': transaction.errorDescription,
//     Timestamp: new Date(transaction.timestamp).toLocaleString(),
//     'Remaining Balance': transaction.remainingBalance,
//   };
// }

// showData(): void {
//   this.displayData = this.transactionDetails.map(transaction => this.mapTransactionToDisplayData(transaction));
//   this.sortTransactions();
// }


//   fetchData(userID: string): void {
//     this.http
//       .get<Transaction[]>(
//         `https://localhost:7211/api/transaction/all/${userID}`
//       )
//       .subscribe(
//         (data) => {
//           this.transactionDetails = data;
//           this.showData();
//         },
//         (error) => {
//           console.error('Error: ', error);
//         }
//       );
//   }

//   // showData(): void {
//   //   this.displayData = this.transactionDetails.map((transaction) => ({
//   //     'Transaction ID': transaction.transactionID,
//   //     'Receiver ID': transaction.userID,
//   //     'Payment Type': transaction.paymentType,
//   //     Amount: transaction.amount,
//   //     Status: transaction.status,
//   //     'Error Description': transaction.errorDescription,
//   //     Timestamp: new Date(transaction.timestamp).toLocaleString(),
//   //     'Remaining Balance': transaction.remainingBalance,
//   //   }));
//   // }

//   downloadXL(): void {
//     const excelData: any[] = [];

//     // Add the headings
//     const headings = {
//       'Transaction ID': 'Transaction ID',
//       'Receiver ID': 'Receiver ID',
//       'Payment Type': 'Payment Type',
//       Amount: 'Amount',
//       Status: 'Status',
//       'Error Description': 'Error Description',
//       Timestamp: 'Timestamp',
//       'Remaining Balance': 'Remaining Balance',
//     };

//     excelData.push(headings);

//     this.transactionDetails.forEach((transaction) => {
//       const rowData = {
//         'Transaction ID': transaction.transactionID,
//         'Receiver ID': transaction.userID,
//         'Payment Type': transaction.paymentType,
//         Amount: transaction.amount,
//         Status: transaction.status,
//         'Error Description': transaction.errorDescription,
//         Timestamp: transaction.timestamp
//           ? new Date(transaction.timestamp).toLocaleString()
//           : 'N/A',
//         'Remaining Balance': transaction.remainingBalance,
//       };

//       excelData.push(rowData);
//     });

//     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData, {
//       skipHeader: true,
//     });

//     const workbook: XLSX.WorkBook = {
//       Sheets: { data: worksheet },
//       SheetNames: ['data'],
//     };
//     const excelBuffer: any = XLSX.write(workbook, {
//       bookType: 'xlsx',
//       type: 'array',
//     });
//     this.saveAsExcelFile(excelBuffer);
//   }

//   saveAsExcelFile(buffer: any): void {
//     const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
//     const url: string = window.URL.createObjectURL(data);
//     const link: HTMLAnchorElement = document.createElement('a');
//     link.href = url;
//     const date = new Date();
//     const formattedDate = `${date.getDate()}-${
//       date.getMonth() + 1
//     }-${date.getFullYear()}`;
//     link.download = `Statement-${this.userService.userValue.name}-${formattedDate}.xlsx`;
//     link.click();
//   }

//   getImageType(imageDataUrl: string): string {
//     const match = imageDataUrl.match(/image\/(.*?);/);
//     return match ? match[1].toUpperCase() : 'JPEG'; // default to JPEG if no match
//   }

//   downloadPDF(): void {
//     const doc = new jsPDF();
//     // Set the color for the header
//     doc.setFillColor(244, 98, 58); // bs-orange #f4623a

//     // Draw the header rectangle
//     doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, 'F');

//     // Set the font color to white
//     doc.setTextColor(255, 255, 255);

//     // Print the header text
//     doc.setFontSize(12);
//     doc.text('Thanks for choosing Banking with us', 10, 10);
//     doc.text('Mobile Banking!         // Transaction Ke SAATH bhi, TRANSACTION ke BAAD bhi..! //', 10, 15);

//     // Reset the font color to black
//     doc.setTextColor(0, 0, 0);

//     let startY = 30;

//     // Print user profile picture
//     const profilePhoto = this.userService.userValue.profilePhoto; // replace with actual data URL
//     const imageFormat = this.getImageType(profilePhoto);
//     const imageData = profilePhoto.split(',')[1];
//     doc.addImage(imageData, imageFormat, doc.internal.pageSize.getWidth() * 0.5, 25, 80, 45); // adjust dimensions as needed

//     // Print bank name
//     doc.text('User Info', 10, startY);
//     startY += 10;

//     // Print account owner and account number
//     const accountOwner = `Name of account owner :  ${this.userService.userValue.name}`;
//     doc.text(accountOwner, 10, startY);
//     startY += 10;

//     const phoneNumber = `Phone number: ${this.userService.userValue.phoneNumber}`;
//     doc.text(phoneNumber, 10, startY);
//     startY += 10;

//     const address = `Address: ${this.userService.userValue.address}`
//     doc.text(address, 10, startY);
//     startY += 10;
   

//     const tableData: any[] = [];
//     const columns = [
//       'Transaction ID',
//       'Receiver ID',
//       'Payment Type',
//       'Amount',
//       'Status',
//       'Error Description',
//       'Timestamp',
//       'Remaining Balance',
//     ];

//     // Add the headings
//     tableData.push(columns);

//     this.transactionDetails.forEach((transaction) => {
//       const rowData = [
//         transaction.transactionID,
//         transaction.userID,
//         transaction.paymentType,
//         transaction.amount,
//         transaction.status,
//         transaction.errorDescription,
//         transaction.timestamp
//           ? new Date(transaction.timestamp).toLocaleString()
//           : 'N/A',
//         transaction.remainingBalance,
//       ];

//       tableData.push(rowData);
//     });

//     autoTable(doc, {
//       head: [tableData[0]],
//       body: tableData.slice(1),
//       startY: startY + 10,
//     });
//     const date = new Date();
//     const formattedDate = `${date.getDate()}-${
//       date.getMonth() + 1
//     }-${date.getFullYear()}`;
//     doc.save(
//       `Statement-${this.userService.userValue.name}-${formattedDate}.pdf`
//     );
//   }

  // downloadXL(): void {
  //   const excelData: any[] = [];

  //   // Add the headings
  //   const headings = {
  //     'Transaction ID': 'Transaction ID',
  //     'Receiver ID': 'Receiver ID',
  //     'Payment Type': 'Payment Type',
  //     'Amount': 'Amount',
  //     'Status': 'Status',
  //     'Error Description': 'Error Description',
  //     'Timestamp': 'Timestamp',
  //     'Remaining Balance': 'Remaining Balance'
  //   };

  //   excelData.push(headings);

  //   this.transactionDetails.forEach(transaction => {
  //     const rowData = {
  //       'Transaction ID': transaction.transactionID,
  //       'Receiver ID': transaction.userID,
  //       'Payment Type': transaction.paymentType,
  //       'Amount': transaction.amount,
  //       'Status': transaction.status,
  //       'Error Description': transaction.errorDescription,
  //       'Timestamp': transaction.timestamp ? new Date(transaction.timestamp).toLocaleString() : 'N/A',
  //       'Remaining Balance': transaction.remainingBalance
  //     };

  //     excelData.push(rowData);
  //   });

  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData, { skipHeader: true });

  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, 'bank_statement');
  // }

  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
  //   const url: string = window.URL.createObjectURL(data);
  //   const link: HTMLAnchorElement = document.createElement('a');
  //   link.href = url;
  //   link.download = `${fileName}.xlsx`;
  //   link.click();
  // }

  // downloadPDF(): void {
  //   const doc = new jsPDF();
  //   let startY = 10;

  //   // Print bank name
  //   doc.text('Bank Name', 10, startY);
  //   startY += 10;

  //   // Print account owner and account number
  //   const accountOwner = 'Name of account owner :  Elon Musk';
  //   const accountNumber = `Account number: ${this.transactionDetails[0].accountNumber}`;
  //   doc.text(accountOwner, 10, startY);
  //   doc.text(accountNumber, 100, startY);
  //   startY += 10;

  //   const tableData: any[] = [];
  //   const columns = [
  //     'Transaction ID',
  //     'Receiver ID',
  //     'Payment Type',
  //     'Amount',
  //     'Status',
  //     'Error Description',
  //     'Timestamp',
  //     'Remaining Balance'
  //   ];

  //   // Add the headings
  //   tableData.push(columns);

  //   this.transactionDetails.forEach(transaction => {
  //     const rowData = [
  //       transaction.transactionID,
  //       transaction.userID,
  //       transaction.paymentType,
  //       transaction.amount,
  //       transaction.status,
  //       transaction.errorDescription,
  //       transaction.timestamp ? new Date(transaction.timestamp).toLocaleString() : 'N/A',
  //       transaction.remainingBalance
  //     ];

  //     tableData.push(rowData);
  //   });

  //   autoTable(doc, {
  //     head: [tableData[0]],
  //     body: tableData.slice(1),
  //     startY: startY + 10
  //   });

  //   doc.save('bank_statement.pdf');
  // }
//}


import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { UserService } from 'src/app/services/user.service';


export interface Transaction {
  transactionID: string;
  userID: string;
  paymentType: string;
  accountNumber: string;
  amount: number;
  status: string;
  errorDescription: string;
  timestamp: string;
  remainingBalance: number;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  
  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchData(this.userService.userValue.userID);
  }

  @ViewChild('pdfContent') pdfContent!: ElementRef;
  displayData: any[] = [];

  transactionDetails: Transaction[] = [];

  filterType = 'All';
  sortType = 'dateDesc';

  filterTransactions(): void {
    if (this.filterType === 'All') {
      this.showData();
    } else {
      this.displayData = this.transactionDetails
        .filter(transaction => transaction.paymentType === this.filterType)
        .map(transaction => this.mapTransactionToDisplayData(transaction));
    }
    this.sortTransactions();
  }

  sortTransactions(): void {
    this.displayData.sort((a, b) => {
      switch (this.sortType) {
        case 'amountAsc':
          return a.Amount - b.Amount;
        case 'amountDesc':
          return b.Amount - a.Amount;
        case 'dateAsc':
          return new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime();
        case 'dateDesc':
          return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
        default:
          return 0;
      }
    });
  }

  mapTransactionToDisplayData(transaction: Transaction): any {
    return {
      'Transaction ID': transaction.transactionID,
      'Account Number': transaction.accountNumber,
      'Payment Type': transaction.paymentType,
      Amount: transaction.amount,
      Status: transaction.status,
      'Error Description': transaction.errorDescription,
      Timestamp: new Date(transaction.timestamp).toLocaleString(),
      'Remaining Balance': transaction.remainingBalance,
    };
  }

  showData(): void {
    this.displayData = this.transactionDetails.map(transaction => this.mapTransactionToDisplayData(transaction));
    this.sortTransactions();
  }

  fetchData(userID: string): void {
    this.http
      .get<Transaction[]>(
        `https://localhost:7211/api/transaction/all/${userID}`
      )
      .subscribe(
        (data) => {
          this.transactionDetails = data;
          this.showData();
        },
        (error) => {
          console.error('Error: ', error);
        }
      );
  }

  downloadXL(): void {
    const excelData: any[] = [];

    // Add the headings
    const headings = {
      'Transaction ID': 'Transaction ID',
      'Account Number': 'Account Number',
      'Payment Type': 'Payment Type',
      Amount: 'Amount',
      Status: 'Status',
      'Error Description': 'Error Description',
      Timestamp: 'Timestamp',
      'Remaining Balance': 'Remaining Balance',
    };

    excelData.push(headings);

    this.transactionDetails.forEach((transaction) => {
      const rowData = {
        'Transaction ID': transaction.transactionID,
        'Account Number': transaction.accountNumber,
        'Payment Type': transaction.paymentType,
        Amount: transaction.amount,
        Status: transaction.status,
        'Error Description': transaction.errorDescription,
        Timestamp: transaction.timestamp
          ? new Date(transaction.timestamp).toLocaleString()
          : 'N/A',
        'Remaining Balance': transaction.remainingBalance,
      };

      excelData.push(rowData);
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData, {
      skipHeader: true,
    });

    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer);
  }

  saveAsExcelFile(buffer: any): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    const date = new Date();
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    link.download = `Statement-${this.userService.userValue.name}-${formattedDate}.xlsx`;
    link.click();
  }

  getImageType(imageDataUrl: string): string {
    const match = imageDataUrl.match(/image\/(.*?);/);
    return match ? match[1].toUpperCase() : 'JPEG'; // default to JPEG if no match
  }

  downloadPDF(): void {
    const doc = new jsPDF();
    // Set the color for the header
    doc.setFillColor(244, 98, 58); // bs-orange #f4623a

    // Draw the header rectangle
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, 'F');

    // Set the font color to white
    doc.setTextColor(255, 255, 255);

    // Print the header text
    doc.setFontSize(12);
    doc.text('Thanks for choosing Banking with us', 10, 10);
    doc.text('Mobile Banking!         // Transaction Ke SAATH bhi, TRANSACTION ke BAAD bhi..! //', 10, 15);

    // Reset the font color to black
    doc.setTextColor(0, 0, 0);

    let startY = 30;

    // Print user profile picture
    const profilePhoto = this.userService.userValue.profilePhoto; // replace with actual data URL
    const imageFormat = this.getImageType(profilePhoto);
    const imageData = profilePhoto.split(',')[1];
    doc.addImage(imageData, imageFormat, doc.internal.pageSize.getWidth() * 0.5, 25, 80, 45); // adjust dimensions as needed

    // Print bank name
    doc.text('User Info', 10, startY);
    startY += 10;

    // Print account owner and account number
    const accountOwner = `Name of account owner :  ${this.userService.userValue.name}`;
    doc.text(accountOwner, 10, startY);
    startY += 10;

    const phoneNumber = `Phone number: ${this.userService.userValue.phoneNumber}`;
    doc.text(phoneNumber, 10, startY);
    startY += 10;

    const address = `Address: ${this.userService.userValue.address}`
    doc.text(address, 10, startY);
    startY += 10;
   

    const tableData: any[] = [];
    const columns = [
      'Transaction ID',
      'Account Number',
      'Payment Type',
      'Amount',
      'Status',
      'Error Description',
      'Timestamp',
      'Remaining Balance',
    ];

    // Add the headings
    tableData.push(columns);

    this.transactionDetails.forEach((transaction) => {
      const rowData = [
        transaction.transactionID,
        transaction.accountNumber,
        transaction.paymentType,
        transaction.amount,
        transaction.status,
        transaction.errorDescription,
        transaction.timestamp
          ? new Date(transaction.timestamp).toLocaleString()
          : 'N/A',
        transaction.remainingBalance,
      ];

      tableData.push(rowData);
    });

    autoTable(doc, {
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: startY + 10,
    });
    const date = new Date();
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    doc.save(
      `Statement-${this.userService.userValue.name}-${formattedDate}.pdf`
    );
  }
}
