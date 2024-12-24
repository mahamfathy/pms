import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { Itasks } from './interfaces/itasks';
import { TasksService } from './services/tasks service/tasks.service';
import { Sort } from '@angular/material/sort';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  dataSource: Itasks[] = [];
  sortedData: Itasks[] = [];
  pageSize: number = 5;
  pageNumber: number = 1;
  numRows!: number;
  moduleName: string = 'tasks';
  filterName: string = 'title';
  searchTitle: string = '';
  searchStatus: string = '';
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
    private _Router: Router,
    private _ToastrService: ToastrService,
  ) {}
  ngOnInit(): void {
    this.getAllTasks();
  }
  ngAfterViewInit(): void {
    this.sortedData = this.dataSource.slice();
  }
  getAllTasks() {
    let myparms = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      title: this.searchTitle,
      status: this.searchStatus,
    };

    this._TasksService.getAllTasks(myparms).subscribe({
      next: (res) => {
        this.dataSource = res.data;
        this.numRows = res.totalNumberOfRecords;
        this.sortedData = this.dataSource;
      },
      error: (err) => {
        console.log(err);
      },
    });
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

  editTask(id: number) {
    this._Router.navigate(['dashboard/manager/tasks/edit-task', id]);
  }
  deleteItem(Item: Itasks) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: Item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this._TasksService.deleteTask(Item.id).subscribe({
          next: (res) => {
            console.log(res);
            this.getAllTasks();
            this._ToastrService.success('Deleted Successfully');
          },
          error: (err) => {
            console.log(err);
            this._ToastrService.error('Error On Delete');
          },
        });
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.getAllTasks();
  }
  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    console.log(data);
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'userName':
          return compare(a.userName, b.userName, isAsc);
        case 'project':
          return compare(a.project.title, b.project.title, isAsc);
        case 'modificationDate':
          return compare(a.modificationDate, b.modificationDate, isAsc);
        case 'creationDate':
          return compare(a.creationDate, b.creationDate, isAsc);
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
