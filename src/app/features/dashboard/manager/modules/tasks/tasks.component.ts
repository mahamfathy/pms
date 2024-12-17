import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Itasks } from './interfaces/itasks';
import { TasksService } from './services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { PageEvent } from '@angular/material/paginator';

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

  constructor(
    private _TasksService: TasksService,
    public dialog: MatDialog,
    private _Router: Router
  ) {}

  pageSize: number = 5;
  pageNumber: number = 1;
  numRows!: number;
  moduleName: string = 'tasks';
  filterName: string = 'title';

  searchTitle: string = '';
  searchStatus: string = '';

  getAllTasks() {
    let myparms = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      title: this.searchTitle,
      status: this.searchStatus,
    };
    console.log(myparms);
    this._TasksService.getAllTasks(myparms).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = res.data;
        this.numRows = res.totalNumberOfRecords;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  viewTask(task: Itasks) {
    const dialogRef = this.dialog.open(ViewTaskComponent, {
      data: task,
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  editTask(id: any) {
    // console.log(id);
    this._Router.navigate(['dashboard/manager/tasks/add-edit-task', id]);
  }

  // fireFilteration() {
  //   let myparms = {
  //     status: this.searchName,
  //     pageNumber: this.pageNumber,
  //     pageSize: this.pageSize,
  //   };

  //   this._TasksService.getAllTasks(myparms).subscribe({
  //     next: (res) => {
  //       // console.log(res);
  //       // this.dataSource = res;
  //       this.dataSource = res.data;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // filterChange(name: string) {
  //   this.filterName = name;
  //   this.searchName = '';
  //   let myparms = {
  //     pageNumber: this.pageNumber,
  //     pageSize: this.pageSize,
  //   };

  //   this._TasksService.getAllTasks(myparms).subscribe({
  //     next: (res) => {
  //       // console.log(res);
  //       // this.dataSource = res;
  //       this.dataSource = res.data;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  handlePageEvent(e: PageEvent) {
    console.log(e);

    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.getAllTasks();
  }
}
