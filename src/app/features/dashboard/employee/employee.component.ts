import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  constructor(private _UserService: UserService) {}
  userName: string = '';
  tasksToDo: number = 0;
  tasksInProgress: number = 0;
  tasksDone: number = 0;
  totaltasksCount: number = 0;
  totalProjectsCount: number = 0;
  chart: any;

  ngOnInit(): void {
    this.getCurrentUser();
    this.getTasksChart();
    this.getAllProjects();
  }
  getCurrentUser(): void {
    this._UserService.onGetCurrentUser().subscribe({
      next: (res) => {
        this.userName = res.userName;
      },
    });
  }
  getTasksChart() {
    this._UserService.onTasksCount().subscribe({
      next: (res) => {
        this.totaltasksCount = res.done + res.toDo + res.inProgress;
        this.tasksDone = res.done;
        this.tasksToDo = res.toDo;
        this.tasksInProgress = res.inProgress;
        this.totaltasksCount =
          this.tasksToDo + this.tasksInProgress + this.tasksDone;
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

  getAllProjects(): void {
    let myParams = {
      title: '',
      pageSize: 1000,
      pageNumber: 1,
    };
    this._UserService.onGetAllProjects(myParams).subscribe({
      next: (res) => {
        this.totalProjectsCount = res.data.length
        // console.log(this.totalProjectsCount );

      },
    });
  }
}
