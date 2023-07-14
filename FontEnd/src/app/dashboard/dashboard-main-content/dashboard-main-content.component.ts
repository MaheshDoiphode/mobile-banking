// import { Component, OnInit } from '@angular/core';
// import { GraphsComponent } from 'src/app/visuals/graphs/graphs.component';

// @Component({
//   selector: 'app-dashboard-main-content',
//   templateUrl: './dashboard-main-content.component.html',
//   styleUrls: ['./dashboard-main-content.component.css']
// })
// export class DashboardMainContentComponent implements OnInit {
//   graphsComponent: GraphsComponent = new GraphsComponent();
//   lineChartData: number[][] = [];
//   pieChartData: number[] = [];
//   barChartData: number[] = [];

//   ngOnInit() {
//     this.lineChartData = this.graphsComponent.getTransactionsByDayList();
//     this.pieChartData = this.graphsComponent.getPositiveNegativeAmountsList();
//     this.barChartData = this.graphsComponent.getCategorySumsList();

//     this.graphsComponent.ngOnInit();
//   }
// }
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-main-content',
  templateUrl: './dashboard-main-content.component.html',
  styleUrls: ['./dashboard-main-content.component.css']
})
export class DashboardMainContentComponent implements OnInit {
  ngOnInit() {
  }
}
