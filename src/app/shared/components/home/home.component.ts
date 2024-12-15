import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HelperService } from '../../services/helper.service';
import { ChartData, ChartType } from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private _HelperService: HelperService){

  }
  usersCount:number = 0;
  tasksCount:number = 0;
  chart: any ;

  ngOnInit() {
    this.getUserChart();
    this.getTasksChart()
  }
  getUserChart(){
    this._HelperService.OnGetUserCount().subscribe({
      next:(res)=>{
        this.usersCount=res;
        console.log(this.usersCount);
      },
      error:(err)=>{
        // console.log(err)
      },
      complete:()=>{
        this.chart = new Chart('userChart', {
          type: 'doughnut',
          data: {
            labels: ['activatedEmployeeCount', 'deactivatedEmployeeCount'],
            datasets: [{
              label: 'Count',
              data: [44,7],
              backgroundColor: ['#315951e5', '#31595193']
            }]
          }
        });
      }
  }
  )
}
getTasksChart() {
  this._HelperService.onTsksCount().subscribe({
    next:(res)=>{
      this.tasksCount=res;
      console.log(this.tasksCount);
    },
    error:(err)=>{
      // console.log(err)
    },
    complete:()=>{
      this.chart = new Chart('taskChart', {
        type: 'doughnut',
        data: {
          labels: ['done', 'toDo', 'inProgress'],
          datasets: [{
            label: 'Count',
            data: [63,19,19],
            backgroundColor: ['#315951e5', '#31595193', '#ef9b28']
          }]
        }
      });
    }
}
)
}

}
