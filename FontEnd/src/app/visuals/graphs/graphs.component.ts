// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Chart, ChartConfiguration, registerables, Point } from 'chart.js';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { forkJoin } from 'rxjs';

// interface Transaction {
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

// interface CategoryExpense {
//   category: string;
//   totalAmount: number;
// }

// @Component({
//   selector: 'app-graphs',
//   templateUrl: './graphs.component.html',
//   styleUrls: ['./graphs.component.css'],
// })
// export class GraphsComponent implements OnInit, OnDestroy {
//   private userID = 'Mahesh91.09683588623945'; // Replace with the actual user ID
//   private categories = ['Groceries', 'Transport', 'Entertainment', 'Others'];

//   private transactionFrequencyChart: Chart<'line', (number | Point | null)[], unknown> | null = null;
//   private debitCreditAmountsChart: Chart<'bar', number[], unknown> | null = null;
//   private paymentTypeChart: Chart<'pie', number[], unknown> | null = null;
//   private categoryExpenditureChart: Chart<'bar', number[], unknown> | null = null;

//   constructor(private http: HttpClient) {}

//   ngOnDestroy() {
//     this.destroyCharts();
//   }

//   private destroyCharts() {
//     if (this.transactionFrequencyChart) {
//       this.transactionFrequencyChart.destroy();
//       console.log('Destroyed transactionFrequencyChart');
//     }
//     if (this.debitCreditAmountsChart) {
//       this.debitCreditAmountsChart.destroy();
//       console.log('Destroyed debitCreditAmountsChart');
//     }
//     if (this.paymentTypeChart) {
//       this.paymentTypeChart.destroy();
//       console.log('Destroyed paymentTypeChart');
//     }
//     if (this.categoryExpenditureChart) {
//       this.categoryExpenditureChart.destroy();
//       console.log('Destroyed categoryExpenditureChart');
//     }
//   }

//   ngOnInit() {
//     Chart.register(...registerables);

//     if (!this.transactionFrequencyChart && !this.debitCreditAmountsChart && !this.paymentTypeChart && !this.categoryExpenditureChart) {
//       this.fetchData().subscribe(
//         ([
//           transactionFrequencyData,
//           debitCreditAmountsData,
//           paymentTypesData,
//           categoryExpenditureData,
//         ]) => {
//           this.destroyCharts();
//           // Create new charts
//           if (transactionFrequencyData) {
//             const transactionFrequencyChartConfig: ChartConfiguration<'line'> = {
//               type: 'line',
//               data: {
//                 labels: Object.keys(transactionFrequencyData),
//                 datasets: [
//                   {
//                     label: 'Number of Transactions',
//                     data: Object.values(transactionFrequencyData).map(Number),
//                     fill: false,
//                     borderColor: 'rgb(75, 192, 192)',
//                     tension: 0.1,
//                   },
//                 ],
//               },
//             };
//             this.transactionFrequencyChart = new Chart(
//               'transactionFrequencyChart',
//               transactionFrequencyChartConfig
//             );
//             console.log('Created transactionFrequencyChart', this.transactionFrequencyChart);
//           }

//           if (debitCreditAmountsData) {
//             const debitCreditAmountsChartConfig: ChartConfiguration<'bar'> = {
//               type: 'bar',
//               data: {
//                 labels: ['Debit', 'Credit'],
//                 datasets: [
//                   {
//                     label: 'Amount',
//                     data: debitCreditAmountsData,
//                     backgroundColor: [
//                       'rgba(255, 99, 132, 0.2)',
//                       'rgba(75, 192, 192, 0.2)',
//                     ],
//                     borderColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)'],
//                     borderWidth: 1,
//                   },
//                 ],
//               },
//               options: {
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                   },
//                 },
//               },
//             };
//             this.debitCreditAmountsChart = new Chart(
//               'debitCreditAmountsChart',
//               debitCreditAmountsChartConfig
//             );
//             console.log('Created debitCreditAmountsChart', this.debitCreditAmountsChart);
//           }

//           if (paymentTypesData) {
//             const paymentTypeChartConfig: ChartConfiguration<'pie> = {
//               type: 'pie',
//               data: {
//                 labels: Object.keys(paymentTypesData),
//                 datasets: [
//                   {
//                     label: 'Payment Types',
//                     data: Object.values(paymentTypesData).map(Number),
//                     backgroundColor: [
//                       'rgba(255, 99, 132, 0.2)',
//                       'rgba(75, 192, 192, 0.2)',
//                       'rgba(255, 205, 86, 0.2)',
//                       'rgba(201, 203, 207, 0.2)',
//                     ],
//                     borderColor: [
//                       'rgb(255, 99, 132)',
//                       'rgb(75, 192, 192)',
//                       'rgb(255, 205, 86)',
//                       'rgb(201, 203, 207)',
//                     ],
//                     borderWidth: 1,
//                   },
//                 ],
//               },
//             };
//             this.paymentTypeChart = new Chart(
//               'paymentTypeChart',
//               paymentTypeChartConfig
//             );
//             console.log('Created paymentTypeChart', this.paymentTypeChart);
//           }

//           if (categoryExpenditureData) {
//             const categoryExpenditureChartConfig: ChartConfiguration<'bar'> = {
//               type: 'bar',
//               data: {
//                 labels: Object.keys(categoryExpenditureData),
//                 datasets: [
//                   {
//                     label: 'Expenditure',
//                     data: Object.values(categoryExpenditureData).map(Number),
//                     backgroundColor: [
//                       'rgba(255, 99, 132, 0.2)',
//                       'rgba(75, 192, 192, 0.2)',
//                       'rgba(255, 205, 86, 0.2)',
//                       'rgba(201, 203, 207, 0.2)',
//                     ],
//                     borderColor: [
//                       'rgb(255, 99, 132)',
//                       'rgb(75, 192, 192)',
//                       'rgb(255, 205, 86)',
//                       'rgb(201, 203, 207)',
//                     ],
//                     borderWidth: 1,
//                   },
//                 ],
//               },
//               options: {
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                   },
//                 },
//               },
//             };
//             this.categoryExpenditureChart = new Chart(
//               'categoryExpenditureChart',
//               categoryExpenditureChartConfig
//             );
//             console.log('Created categoryExpenditureChart', this.categoryExpenditureChart);
//           }
//         }
//       );
//     }
//   }

//   private fetchData() {
//     return forkJoin([
//       this.fetchTransactionFrequencyData(),
//       this.fetchDebitCreditAmountsData(),
//       this.fetchPaymentTypesData(),
//       this.fetchCategoryExpenditureData(),
//     ]);
//   }

//   private fetchTransactionFrequencyData() {
//     const url = `http://localhost:3000/transactionFrequency/${this.userID}`;
//     return this.http.get<Record<string, number>>(url);
//   }

//   private fetchDebitCreditAmountsData() {
//     const url = `http://localhost:3000/debitCreditAmounts/${this.userID}`;
//     return this.http.get<number[]>(url);
//   }

//   private fetchPaymentTypesData() {
//     const url = `http://localhost:3000/paymentTypes/${this.userID}`;
//     return this.http.get<Record<string, number>>(url);
//   }

//   private fetchCategoryExpenditureData() {
//     const url = `http://localhost:3000/categoryExpenditure/${this.userID}`;
//     return this.http.get<Record<string, number>>(url);
//   }
// }




import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, registerables, Point } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

interface Transaction {
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
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
})
export class GraphsComponent implements OnInit, OnDestroy {
  private userID = 'Mahesh91.09683588623945'; // Replace with the actual user ID

  private transactionFrequencyChart: Chart<
    'line',
    (number | Point | null)[],
    unknown
  > | null = null;
  private debitCreditAmountsChart: Chart<
    'bar',
    (number | [number, number] | null)[],
    unknown
  > | null = null;
  private paymentTypeChart: Chart<'pie', number[], unknown> | null = null;

  constructor(private http: HttpClient) {}

  ngOnDestroy() {
    this.destroyCharts();
  }

  private destroyCharts() {
    if (this.transactionFrequencyChart) {
      this.transactionFrequencyChart.destroy();
      console.log('Destroyed transactionFrequencyChart');
    }
    if (this.debitCreditAmountsChart) {
      this.debitCreditAmountsChart.destroy();
      console.log('Destroyed debitCreditAmountsChart');
    }
    if (this.paymentTypeChart) {
      this.paymentTypeChart.destroy();
      console.log('Destroyed paymentTypeChart');
    }
  }

  ngOnInit() {
    Chart.register(...registerables);

    if (
      !this.transactionFrequencyChart &&
      !this.debitCreditAmountsChart &&
      !this.paymentTypeChart
    ) {
      this.fetchData().subscribe(
        ([
          transactionFrequencyData,
          debitCreditAmountsData,
          paymentTypesData,
        ]) => {
          this.destroyCharts();
          // Create new charts
          if (transactionFrequencyData) {
            const transactionFrequencyChartConfig: ChartConfiguration<'line'> =
              {
                type: 'line',
                data: {
                  labels: Object.keys(transactionFrequencyData),
                  datasets: [
                    {
                      label: 'Number of Transactions',
                      data: Object.values(transactionFrequencyData).map(Number),
                      fill: false,
                      borderColor: 'rgb(75, 192, 192)',
                      tension: 0.1,
                    },
                  ],
                },
              };
            this.transactionFrequencyChart = new Chart(
              'transactionFrequencyChart',
              transactionFrequencyChartConfig
            );
            console.log(
              'Created transactionFrequencyChart',
              this.transactionFrequencyChart
            );
          }

          if (debitCreditAmountsData) {
            const debitCreditAmountsChartConfig: ChartConfiguration<'bar'> = {
              type: 'bar',
              data: {
                labels: ['Debit', 'Credit'],
                datasets: [
                  {
                    label: 'Amount',
                    data: debitCreditAmountsData.map(Number),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)'],
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            };
            this.debitCreditAmountsChart = new Chart(
              'debitCreditAmountsChart',
              debitCreditAmountsChartConfig
            );
            console.log(
              'Created debitCreditAmountsChart',
              this.debitCreditAmountsChart
            );
          }
          if (paymentTypesData) {
            const paymentTypeChartConfig: ChartConfiguration<'pie'> = {
              type: 'pie',
              data: {
                labels: Object.keys(paymentTypesData),
                datasets: [
                  {
                    label: 'Number of Transactions',
                    data: Object.values(paymentTypesData).map(Number),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(201, 203, 207, 0.2)',
                    ],
                    borderColor: [
                      'rgb(255, 99, 132)',
                      'rgb(75, 192, 192)',
                      'rgb(255, 205, 86)',
                      'rgb(201, 203, 207)',
                    ],
                    borderWidth: 1,
                  },
                ],
              },
            };
            this.paymentTypeChart = new Chart(
              'paymentTypeChart',
              paymentTypeChartConfig
            );
          }
        }
      );
    }
  }

  private fetchData() {
    const transactionsByDay$ = this.http
      .get<Transaction[]>(
        `https://localhost:7211/api/transaction/all/${this.userID}`
      )
      .pipe(
        map((transactions) => {
          const transactionsByDay: { [key: string]: number } = {};
          transactions.forEach((transaction) => {
            const date = new Date(transaction.timestamp).toLocaleDateString();
            if (!transactionsByDay[date]) {
              transactionsByDay[date] = 0;
            }
            transactionsByDay[date]++;
          });
          return transactionsByDay;
        })
      );

    const positiveNegativeAmounts$ = this.http
      .get<Transaction[]>(
        `https://localhost:7211/api/transaction/all/${this.userID}`
      )
      .pipe(
        map((transactions) => {
          const positiveNegativeAmounts = [0, 0]; // [debit, credit]
          transactions.forEach((transaction) => {
            if (transaction.amount < 0) {
              positiveNegativeAmounts[0] += transaction.amount;
            } else {
              positiveNegativeAmounts[1] += transaction.amount;
            }
          });
          return positiveNegativeAmounts;
        })
      );

    const paymentTypes$ = this.http
      .get<Transaction[]>(
        `https://localhost:7211/api/transaction/all/${this.userID}`
      )
      .pipe(
        map((transactions) => {
          const paymentTypes: { [key: string]: number } = {};
          transactions.forEach((transaction) => {
            if (!paymentTypes[transaction.paymentType]) {
              paymentTypes[transaction.paymentType] = 0;
            }
            paymentTypes[transaction.paymentType]++;
          });
          return paymentTypes;
        })
      );

    return forkJoin([
      transactionsByDay$,
      positiveNegativeAmounts$,
      paymentTypes$,
    ]);
  }
}

// v111
// import { Component, OnInit } from '@angular/core';
// import { Chart, ChartConfiguration, registerables } from 'chart.js';
// import { TransactionDetail, Category, Transaction, TransactionInfo } from './models/TransactionDetails';
// import { forkJoin } from 'rxjs';

// @Component({
//   selector: 'app-graphs',
//   templateUrl: './graphs.component.html',
//   styleUrls: ['./graphs.component.css']
// })
// export class GraphsComponent implements OnInit {
//   ngOnInit() {
//     Chart.register(...registerables);
//     const dataGenerator = new DataGenerator();
//     const transactionsByDay = dataGenerator.getTransactionsByDayList();
//     const positiveNegativeAmounts = dataGenerator.getPositiveNegativeAmountsList();
//     const categorySums = dataGenerator.getCategorySumsList();

//     // Transaction Frequency
//     const lineChartConfig: ChartConfiguration<'line'> = {
//       type: 'line',
//       data: {
//         labels: ['Jan', 'February', 'March', 'April', 'May', 'June'],
//         datasets: [
//           {
//             label: 'Sample Data',
//             data: transactionsByDay[0],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1
//           }
//         ]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false
//       }
//     };
//     new Chart('lineChart', lineChartConfig);

//     // Debit vs Credit
//     // Pie Chart
//     const pieChartConfig: ChartConfiguration<'pie'> = {
//       type: 'pie',
//       data: {
//         labels: ['Category 1', 'Category 2'],
//         datasets: [
//           {
//             label: 'Sample Data',
//             data: positiveNegativeAmounts,
//             backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)']
//           }
//         ]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false
//       }
//     };
//     new Chart('pieChart', pieChartConfig);

//     // Category wise expenditure
//     const horizontalBarChartConfig: ChartConfiguration<'bar'> = {
//       type: 'bar',
//       data: {
//         labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
//         datasets: [
//           {
//             label: 'Sample Data',
//             data: categorySums,
//             backgroundColor: 'rgb(75, 192, 192)'
//           }
//         ]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         indexAxis: 'y'
//       }
//     };
//     new Chart('barChart', horizontalBarChartConfig);
//   }

//   getTransactionsByDayList(): number[][] {
//     const dataGenerator = new DataGenerator();
//     return dataGenerator.getTransactionsByDayList();
//   }

//   getPositiveNegativeAmountsList(): number[] {
//     const dataGenerator = new DataGenerator();
//     return dataGenerator.getPositiveNegativeAmountsList();
//   }

//   getCategorySumsList(): number[] {
//     const dataGenerator = new DataGenerator();
//     return dataGenerator.getCategorySumsList();
//   }
// }

// class DataGenerator {
//   private transactionDetails: TransactionDetail[] = [];
//   private category: Category;

//   constructor() {
//     this.category = this.generateRandomCategory();
//     this.generateTransactionDetails();
//   }

//   private generateRandomTransactionInfo(): TransactionInfo[] {
//     const transactionInfos: TransactionInfo[] = [];

//     for (let i = 0; i < 30; i++) {
//       const transactionID = `transaction-${i + 1}`;
//       const receiverID = Math.floor(Math.random() * 1000);
//       const paymentType = ['Credit Card', 'Debit Card'][Math.floor(Math.random() * 2)];
//       const amount = Math.random() * 1000;
//       const status = ['Pending', 'Completed'][Math.floor(Math.random() * 2)];
//       const errorDescription = status === 'Pending' ? 'Transaction pending' : undefined;
//       const timestamp = new Date();
//       const remainingBalance = Math.random() * 10000;

//       const transactionInfo: TransactionInfo = {
//         transactionID,
//         receiverID,
//         paymentType,
//         amount,
//         status,
//         errorDescription,
//         timestamp,
//         remainingBalance,
//       };

//       transactionInfos.push(transactionInfo);
//     }

//     return transactionInfos;
//   }

//   private generateRandomCategory(): Category {
//     const accountId = 'account-1';
//     const categories: Record<string, Transaction[]> = {};

//     for (let i = 0; i < 5; i++) {
//       const categoryName = `Category ${i + 1}`;
//       const transactions: Transaction[] = [];

//       for (let j = 0; j < 4; j++) {
//         const transactionId = `transaction-${i * 4 + j + 1}`;
//         const amount = Math.random() * 1000;
//         const timestamp = new Date();

//         const transaction: Transaction = {
//           transactionId,
//           amount,
//           timestamp,
//         };

//         transactions.push(transaction);
//       }

//       categories[categoryName] = transactions;
//     }

//     return {
//       accountId,
//       categories,
//     };
//   }

//   private generateTransactionDetails(): void {
//     for (let i = 0; i < 30; i++) {
//       const accountID = `account-${i + 1}`;
//       const transactions = this.generateRandomTransactionInfo();

//       const transactionDetail: TransactionDetail = {
//         accountID,
//         transactions,
//       };

//       this.transactionDetails.push(transactionDetail);
//     }
//   }

//   private getTransactionsByDay(transactionDetails: TransactionDetail[]): TransactionInfo[][] {
//     const transactionsByDay: TransactionInfo[][] = [];
//     const dateMap: Map<string, TransactionInfo[]> = new Map();

//     for (const detail of transactionDetails) {
//       if (detail.transactions) {
//         for (const transaction of detail.transactions) {
//           const dateKey = transaction.timestamp?.toDateString();

//           if (dateKey) {
//             if (!dateMap.has(dateKey)) {
//               dateMap.set(dateKey, []);
//             }

//             const transactions = dateMap.get(dateKey) || [];
//             transactions.push(transaction);
//             dateMap.set(dateKey, transactions);
//           }
//         }
//       }
//     }

//     for (const transactions of dateMap.values()) {
//       transactionsByDay.push(transactions);
//     }

//     return transactionsByDay;
//   }

//   private getPositiveNegativeAmounts(transactionDetails: TransactionDetail[]): [number, number] {
//     let positiveSum = 0;
//     let negativeSum = 0;

//     for (const detail of transactionDetails) {
//       if (detail.transactions) {
//         for (const transaction of detail.transactions) {
//           if (transaction.amount && transaction.amount > 0) {
//             positiveSum += transaction.amount;
//           } else {
//             negativeSum += Math.abs(transaction.amount || 0);
//           }
//         }
//       }
//     }

//     return [positiveSum, negativeSum];
//   }

//   private getCategorySums(categories: Category): number[] {
//     const categorySums: number[] = [];

//     for (const categoryName in categories.categories) {
//       const transactions = categories.categories[categoryName];
//       let categorySum = 0;

//       for (const transaction of transactions) {
//         categorySum += transaction.amount;
//       }

//       categorySums.push(categorySum);
//     }

//     return categorySums;
//   }

//   public getTransactionsByDayList(): number[][] {
//     return this.getTransactionsByDay(this.transactionDetails).map((transactions) =>
//       transactions.map((transaction) => transaction.amount || 0)
//     );
//   }

//   public getPositiveNegativeAmountsList(): number[] {
//     const [positiveSum, negativeSum] = this.getPositiveNegativeAmounts(this.transactionDetails);
//     return [positiveSum, negativeSum];
//   }

//   public getCategorySumsList(): number[] {
//     return this.getCategorySums(this.category);
//   }
// }

// // Usage example
// const dataGenerator = new DataGenerator();
// const transactionsByDay = dataGenerator.getTransactionsByDayList();
// const positiveNegativeAmounts = dataGenerator.getPositiveNegativeAmountsList();
// const categorySums = dataGenerator.getCategorySumsList();

// import { Component, OnInit } from '@angular/core';
// import { Chart, ChartConfiguration, registerables } from 'chart.js';
// import { HttpClient } from '@angular/common/http';
// import { map, Observable } from 'rxjs';
// import { forkJoin } from 'rxjs';

// interface Transaction {
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
//   selector: 'app-graphs',
//   templateUrl: './graphs.component.html',
//   styleUrls: ['./graphs.component.css'],
// })
// export class GraphsComponent implements OnInit {
//   private categories = ['Groceries', 'Transport', 'Entertainment', 'Others'];
//   private userID = 'Mahesh91.09683588623945'; // Replace with the actual user ID

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     Chart.register(...registerables);

//     this.fetchData().subscribe(
//       ([transactionsByDay, positiveNegativeAmounts, categorySums]) => {
//         // Transaction Frequency
//         const lineChartConfig: ChartConfiguration<'line'> = {
//           type: 'line',
//           data: {
//             labels: this.categories,
//             datasets: transactionsByDay.map((data, index) => ({
//               label: this.categories[index],
//               data,
//               fill: false,
//               borderColor: 'rgb(75, 192, 192)',
//               tension: 0.1,
//             })),
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: false,
//           },
//         };
//         new Chart('lineChart', lineChartConfig);
//         // Debit vs Credit
//         // Pie Chart
//         const pieChartConfig: ChartConfiguration<'pie'> = {
//           type: 'pie',
//           data: {
//             labels: ['Debit', 'Credit'],
//             datasets: [
//               {
//                 label: 'Sample Data',
//                 data: positiveNegativeAmounts,
//                 backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
//               },
//             ],
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: false,
//           },
//         };
//         new Chart('pieChart', pieChartConfig);

//         // Category wise expenditure
//         const horizontalBarChartConfig: ChartConfiguration<'bar'> = {
//           type: 'bar',
//           data: {
//             labels: this.categories,
//             datasets: [
//               {
//                 label: 'Sample Data',
//                 data: categorySums,
//                 backgroundColor: 'rgb(75, 192, 192)',
//               },
//             ],
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             indexAxis: 'y',
//           },
//         };
//         new Chart('horizontalBarChart', horizontalBarChartConfig);
//       }
//     );
//   }

//   private fetchData(): Observable<[number[][], [number, number], number[]]> {
//     const transactionsByDay: Observable<number[]>[] = this.categories.map(
//       (category) =>
//         this.fetchCategoryTransactions(category).pipe(
//           map((transactions: Transaction[]) =>
//             transactions.map((transaction: Transaction) => transaction.amount)
//           )
//         )
//     );

//     const positiveNegativeAmounts: Observable<[number, number]> = forkJoin(
//       transactionsByDay
//     ).pipe(
//       map((data: number[][]) => {
//         const amounts: number[] = data.flat();
//         const positive: number = amounts
//           .filter((amount: number) => amount > 0)
//           .reduce((a: number, b: number) => a + b, 0);
//         const negative: number = amounts
//           .filter((amount: number) => amount < 0)
//           .reduce((a: number, b: number) => a + b, 0);
//         return [positive, Math.abs(negative)];
//       })
//     );

//     const categorySums: Observable<number[]> = forkJoin(transactionsByDay).pipe(
//       map((data: number[][]) =>
//         data.map((transactions: number[]) =>
//           transactions.reduce((a: number, b: number) => a + b, 0)
//         )
//       )
//     );

//     return forkJoin([
//       forkJoin(transactionsByDay),
//       positiveNegativeAmounts,
//       categorySums,
//     ]);
//   }

//   private fetchCategoryTransactions(
//     category: string
//   ): Observable<Transaction[]> {
//     const url = `https://localhost:7211/api/ExpenseManagement/ExpensesByCategory/${this.userID}/${category}`;
//     return this.http.get<Transaction[]>(url);
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { Chart, ChartConfiguration, registerables } from 'chart.js';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';

// interface Transaction {
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
//   selector: 'app-graphs',
//   templateUrl: './graphs.component.html',
//   styleUrls: ['./graphs.component.css'],
// })
// export class GraphsComponent implements OnInit {
//   private userID = 'Mahesh91.09683588623945'; // Replace with the actual user ID

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     Chart.register(...registerables);

//     this.fetchData().subscribe(
//       ([transactionsByDay, positiveNegativeAmounts]) => {
//         // Transaction Frequency
//         const lineChartConfig: ChartConfiguration<'line'> = {
//           type: 'line',
//           data: {
//             labels: Object.keys(transactionsByDay),
//             datasets: [
//               {
//                 label: 'Transactions Frequency',
//                 data: Object.values(transactionsByDay),
//                 fill: false,
//                 borderColor: 'rgb(75, 192, 192)',
//                 tension: 0.1,
//               },
//             ],
//           },
//         };
//         new Chart('lineChart', lineChartConfig);

//         // Debit/Credit Amounts
//         const barChartConfig: ChartConfiguration<'bar'> = {
//           type: 'bar',
//           data: {
//             labels: ['Debit', 'Credit'],
//             datasets: [
//               {
//                 label: 'Debit/Credit Amounts',
//                 data: positiveNegativeAmounts,
//                 backgroundColor: [
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(75, 192, 192, 0.2)',
//                 ],
//                 borderColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)'],
//                 borderWidth: 1,
//               },
//             ],
//           },
//           options: {
//             scales: {
//               y: {
//                 beginAtZero: true,
//               },
//             },
//           },
//         };
//         new Chart('barChart', barChartConfig);
//       }
//     );
//   }

//   private fetchData() {
//     return this.http
//       .get<Transaction[]>(`https://localhost:7211/api/transaction/all/${this.userID}`)
//       .pipe(
//         map((transactions) => {
//           const transactionsByDay: { [key: string]: number } = {};
//           const positiveNegativeAmounts: number[] = [0, 0]; // [debit, credit]

//           transactions.forEach((transaction) => {
//             const date = new Date(transaction.timestamp).toDateString();
//             transactionsByDay[date] = (transactionsByDay[date] || 0) + 1;

//             if (transaction.amount < 0) {
//               positiveNegativeAmounts[0] += transaction.amount;
//             } else {
//               positiveNegativeAmounts[1] += transaction.amount;
//             }
//           });

//           return [Object.values(transactionsByDay), positiveNegativeAmounts];
//         })
//       );
//   }
// }
// -----------------

// import { Component, OnInit } from '@angular/core';
// import { Chart, ChartConfiguration, registerables } from 'chart.js';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { forkJoin } from 'rxjs';

// interface Transaction {
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

// interface CategoryExpense {
//   category: string;
//   totalAmount: number;
// }

// @Component({
//   selector: 'app-graphs',
//   templateUrl: './graphs.component.html',
//   styleUrls: ['./graphs.component.css'],
// })
// export class GraphsComponent implements OnInit {
//   private userID = 'Mahesh91.09683588623945'; // Replace with the actual user ID
//   private categories = ['Groceries', 'Transport', 'Entertainment', 'Others'];

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     Chart.register(...registerables);

//     this.fetchData().subscribe(
//       ([transactionsByDay, positiveNegativeAmounts, categorySpending, paymentTypesData]) => {
//         // Transaction Frequency
//         const lineChartConfig: ChartConfiguration<'line'> = {
//           type: 'line',
//           data: {
//             labels: Object.keys(transactionsByDay),
//             datasets: [
//               {
//                 label: 'Transactions Frequency',
//                 data: Object.values(transactionsByDay),
//                 fill: false,
//                 borderColor: 'rgb(75, 192, 192)',
//                 tension: 0.1,
//               },
//             ],
//           },
//         };
//         new Chart('lineChart', lineChartConfig);

//         // Debit/Credit Amounts
//         const barChartConfig: ChartConfiguration<'bar'> = {
//           type: 'bar',
//           data: {
//             labels: ['Debit', 'Credit'],
//             datasets: [
//               {
//                 label: 'Debit/Credit Amounts',
//                 data: positiveNegativeAmounts,
//                 backgroundColor: [
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(75, 192, 192, 0.2)',
//                 ],
//                 borderColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)'],
//                 borderWidth: 1,
//               },
//             ],
//           },
//           options: {
//             scales: {
//               y: {
//                 beginAtZero: true,
//               },
//             },
//           },
//         };
//         new Chart('barChart', barChartConfig);

//         // Category Spending
//         const doughnutChartConfig: ChartConfiguration<'doughnut'> = {
//           type: 'doughnut',
//           data: {
//             labels: Object.keys(categorySpending),
//             datasets: [
//               {
//                 label: 'Category Spending',
//                 data: Object.values(categorySpending),
//                 backgroundColor: [
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(75, 192, 192, 0.2)',
//                   'rgba(255, 205, 86, 0.2)',
//                   'rgba(201, 203, 207, 0.2)',
//                 ],
//                 borderColor: [
//                   'rgb(255, 99, 132)',
//                   'rgb(75, 192, 192)',
//                   'rgb(255, 205, 86)',
//                   'rgb(201, 203, 207)',
//                 ],
//                 borderWidth: 1,
//               },
//             ],
//           },
//         };
//         new Chart('categorySpendingChart', doughnutChartConfig);

//         // Payment Types
//         const pieChartConfig: ChartConfiguration<'pie'> = {
//           type: 'pie',
//           data: {
//             labels: Object.keys(paymentTypesData),
//             datasets: [
//               {
//                 label: 'Payment Types',
//                 data: Object.values(paymentTypesData),
//                 backgroundColor: [
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(75, 192, 192, 0.2)',
//                   'rgba(255, 205, 86, 0.2)',
//                   'rgba(201, 203, 207, 0.2)',
//                 ],
//                 borderColor: [
//                   'rgb(255, 99, 132)',
//                   'rgb(75, 192, 192)',
//                   'rgb(255, 205, 86)',
//                   'rgb(201, 203, 207)',
//                 ],
//                 borderWidth: 1,
//               },
//             ],
//           },
//         };
//         new Chart('paymentTypeChart', pieChartConfig);
//       }
//     );
//   }
//   private fetchData() {
//     const transactionsByDay$ = this.http
//       .get<Transaction[]>(`https://localhost:7211/api/transaction/all/${this.userID}`)
//       .pipe(
//         map((transactions) => {
//           const transactionsByDay: { [key: string]: number } = {};
//           transactions.forEach((transaction) => {
//             const date = new Date(transaction.timestamp).toLocaleDateString();
//             if (!transactionsByDay[date]) {
//               transactionsByDay[date] = 0;
//             }
//             transactionsByDay[date]++;
//           });
//           return transactionsByDay;
//         })
//       );

//     const positiveNegativeAmounts$ = this.http
//       .get<Transaction[]>(`https://localhost:7211/api/transaction/all/${this.userID}`)
//       .pipe(
//         map((transactions) => {
//           const positiveNegativeAmounts = [0, 0]; // [debit, credit]
//           transactions.forEach((transaction) => {
//             if (transaction.amount < 0) {
//               positiveNegativeAmounts[0] += transaction.amount;
//             } else {
//               positiveNegativeAmounts[1] += transaction.amount;
//             }
//           });
//           return positiveNegativeAmounts;
//         })
//       );

//     const categorySpending$ = forkJoin(
//       this.categories.map((category) =>
//         this.http
//           .get<CategoryExpense[]>(`https://localhost:7211/api/ExpenseManagement/ExpensesByCategory/${this.userID}/${category}`)
//           .pipe(
//             map((expenses) => {
//               let totalAmount = 0;
//               expenses.forEach((expense) => {
//                 totalAmount += expense.totalAmount;
//               });
//               return { [category]: totalAmount };
//             })
//           )
//       )
//     ).pipe(
//       map((results) => {
//         const categorySpending: { [key: string]: number } = {};
//         results.forEach((result) => {
//           const [category] = Object.keys(result);
//           categorySpending[category] = result[category];
//         });
//         return categorySpending;
//       })
//     );

//     const paymentTypesData$ = this.http
//       .get<Transaction[]>(`https://localhost:7211/api/transaction/all/${this.userID}`)
//       .pipe(
//         map((transactions) => {
//           const paymentTypesData: { [key: string]: number } = {};
//           transactions.forEach((transaction) => {
//             if (!paymentTypesData[transaction.paymentType]) {
//               paymentTypesData[transaction.paymentType] = 0;
//             }
//             paymentTypesData[transaction.paymentType]++;
//           });
//           return paymentTypesData;
//         })
//       );

//     return forkJoin([transactionsByDay$, positiveNegativeAmounts$, categorySpending$,paymentTypesData$]);
//   }
// }
