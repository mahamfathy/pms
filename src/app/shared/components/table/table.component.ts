import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IProjectslist } from 'src/app/features/dashboard/manager/modules/manager-projects/interfaces/iproject';
import { TasksService } from 'src/app/features/dashboard/manager/modules/tasks/services/tasks.service';
import { BlockUserComponent } from 'src/app/features/dashboard/manager/modules/users/components/block-user/block-user.component';
import { IUser } from 'src/app/features/dashboard/manager/modules/users/interfaces/IUser';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource!: any[];
  @Input() displayedColumns: string[] = [];
  @Input() actions: any[] = [];
  @Input() moduleName: string = '';
  @Input() numRows!: number;
  @Output() userViewed = new EventEmitter<any>();
  @Output() projectViewed = new EventEmitter<any>();
  @Output() projectDeleted = new EventEmitter<any>();
  @Output() projectEdited = new EventEmitter<any>();
  @Output() userBlocked = new EventEmitter<any>();
  constructor(private _TasksService: TasksService, private dialog: MatDialog) {}
<<<<<<< HEAD
=======
  isBlocked: boolean = false;
>>>>>>> 7ef4034 ([feat] block user : finish in the methods and dialog)
  data!: any;
  filterName: string = 'Title';
  pageSize: number = 5;
  pageNumber: number = 1;
  searchName: string = '';

  viewUser(user: IUser): void {
    this.userViewed.emit(user);
  }
  toggleBlock(user: IUser): void {
    const dialogRef = this.dialog.open(BlockUserComponent, {
      width: '400px',
<<<<<<< HEAD
      data: user,
=======
      data: user, // Pass the user data to the dialog
>>>>>>> 7ef4034 ([feat] block user : finish in the methods and dialog)
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userBlocked.emit(user);
      }
    });
  }
  blockUser(user: IUser): void {
    user.isActivated = false;
    this.userBlocked.emit(user);
  }

  unblockUser(user: IUser): void {
    user.isActivated = true;
    this.userBlocked.emit(user);
  }

  viewProject(project: IProjectslist): void {
    this.projectViewed.emit(project);
    // console.log(project);
  }
  deleteProject(project: IProjectslist): void {
    this.projectDeleted.emit(project);
    // console.log(project);
  }
  editProject(project: IProjectslist): void {
    this.projectEdited.emit(project);
  }
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
        this.dataSource = res;
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
        this.dataSource = res;

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
    // console.log(this.displayedColumns);
    // console.log(this.dataSource);
  }
}
