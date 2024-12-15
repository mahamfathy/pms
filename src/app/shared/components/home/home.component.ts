import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HelperService } from '../../services/helper.service';
import { ChartData, ChartType } from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private _HelperService: HelperService) {}
  usersCount: number = 0;
  actvatedUsers: number = 0;
  deactvatedUsers: number = 0;
  totalUsers: number = 0;
  tasksCount: number = 0;
  tasksDone: number = 0;
  tasksToDo: number = 0;
  tasksInProgress: number = 0;
  totalTasks: number = 0;
  chart: any;

  ngOnInit() {
    this.getUserChart();
    this.getTasksChart();
  }
  getUserChart() {
    this._HelperService.OnGetUserCount().subscribe({
      next: (res) => {
        this.usersCount = res;
        // console.log(this.usersCount);
        this.totalUsers =
          res.activatedEmployeeCount + res.deactivatedEmployeeCount;
        // console.log(this.totalUsers);
        this.actvatedUsers = res.activatedEmployeeCount;
        this.deactvatedUsers = res.deactivatedEmployeeCount;
      },
      error: (err) => {
        // console.log(err)
      },
      complete: () => {
        this.chart = new Chart('userChart', {
          type: 'doughnut',
          data: {
            labels: ['activatedEmployeeCount', 'deactivatedEmployeeCount'],
            datasets: [
              {
                label: 'Count',
                data: [this.actvatedUsers, this.deactvatedUsers],
                backgroundColor: ['#315951e5', '#31595193'],
              },
            ],
          },
        });
      },
    });
  }
  getTasksChart() {
    this._HelperService.onTsksCount().subscribe({
      next: (res) => {
        this.tasksCount = res;
        // console.log(this.tasksCount);
        this.totalTasks = res.done + res.toDo + res.inProgress;
        this.tasksDone = res.done;
        this.tasksToDo = res.toDo;
        this.tasksInProgress = res.inProgress;
        // console.log(this.totalTasks);
      },
      error: (err) => {
        // console.log(err)
      },
      complete: () => {
        this.chart = new Chart('taskChart', {
          type: 'doughnut',
          data: {
            labels: ['done', 'toDo', 'inProgress'],
            datasets: [
              {
                label: 'Count',
                data: [this.tasksDone, this.tasksToDo, this.tasksInProgress],
                backgroundColor: ['#315951e5', '#31595193', '#ef9b28'],
              },
            ],
          },
        });
      },
    });
  }
}
