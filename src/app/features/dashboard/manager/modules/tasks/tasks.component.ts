import { Component } from '@angular/core';
import { Itasks } from './interfaces/itasks';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  dataSource!: Itasks[];
  displayedColumns: string[] = [
    'title',
    'status',
    'userName',
    'project',
    'creationDate',
    'description',
    'actions',
  ];
  actions: any[] = [
    {
      name: 'View',
      icon: 'visibility',
    },
    {
      name: 'Edit',
      icon: 'edit',
    },
    {
      name: 'Delete',
      icon: 'delete',
    },
  ];

  constructor(private _TasksService: TasksService) {}

  pageSize: number = 5;
  pageNumber: number = 1;
  numRows!: number;
  moduleName: string = 'tasks';

  myparms = {
    pageNumber: this.pageNumber,
    pageSize: this.pageSize,
  };

  ngOnInit(): void {
    this._TasksService.getAllTasks(this.myparms).subscribe({
      next: (res) => {
        // console.log(res);
        this.dataSource = res.data;
        this.numRows = res.totalNumberOfRecords;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
