import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TasksService } from 'src/app/features/dashboard/manager/modules/tasks/services/tasks.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource!: any[];
  @Input() displayedColumns: string[] = [];
  @Input() actions: any[] = [];
  @Input() numRows!: number;
  constructor(private _TasksService: TasksService) {}

  data!: any;
  filterName: string = 'Title';
  pageSize: number = 5;
  pageNumber: number = 1;
  searchName: string = '';

  ngOnChanges(): void {
    console.log(this.displayedColumns);
    console.log(this.dataSource);
    this.data = new MatTableDataSource(this.dataSource);
  }

  fireFilteration() {
    let myparms = {
      status: this.searchName,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };

    this._TasksService.getAllTasks(myparms).subscribe({
      next: (res) => {
        console.log(res);
        this.data = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterChange(name: string) {
    this.filterName = name;
    this.searchName = '';
    let myparms = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };

    this._TasksService.getAllTasks(myparms).subscribe({
      next: (res) => {
        console.log(res);
        this.data = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handlePageEvent(e: PageEvent) {
    // this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.fireFilteration();
  }
}
