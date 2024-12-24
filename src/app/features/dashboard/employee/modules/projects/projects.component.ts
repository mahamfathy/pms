import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee service/employee.service';
import { IemployeeProjects } from './interfaces/iemployee-projects';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  constructor(private _EmployeeService: EmployeeService) {}

  displayedColumns: string[] = [
    'title',
    'description',
    'modificationDate',
    'Num Tasks',
    'creationDate',
  ];

  dataSource: IemployeeProjects[] = [];
  sortedData: IemployeeProjects[] = [];
  moduleName: string = 'projects';
  numRows!: number;
  pageSize: number = 5;
  pageNumber: number = 1;
  searchName: string = '';
  ngOnInit(): void {
    this.getProjects();
  }
  ngAfterViewInit(): void {
    this.sortedData = this.dataSource.slice();
  }
  getProjects() {
    let myParms = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      title: this.searchName,
    };

    this._EmployeeService.onGetAllProjects(myParms).subscribe({
      next: (res) => {
        this.dataSource = res.data;
        this.numRows = res.data.length;
        this.sortedData = this.dataSource.slice();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.getProjects();
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
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'modificationDate':
          return compare(a.modificationDate, b.modificationDate, isAsc);
        case 'Num Tasks':
          return compare(a.task.length, b.task.length, isAsc);
        case 'creationDate':
          return compare(a.creationDate, b.creationDate, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

