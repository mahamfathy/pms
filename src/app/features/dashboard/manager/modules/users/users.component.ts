import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { IUser } from './interfaces/IUser';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  defaultImage: string = 'assets/images/def-avatar.avif';
  pageSize: number = 10;
  pageNumber: number = 1;
  tableRes: any;
  displayedColumns: string[] = [
    'userName',
    'imagePath',
    'email',
    'country',
    'phoneNumber',
    'actions',
  ];
  actions: any[] = [
    {
      name: 'Block',
      icon: 'block',
    },
    {
      name: 'View',
      icon: 'visibility',
    },
  ];
  dataSource: IUser[] = [];
  constructor(private _UsersService: UsersService) {}
  ngOnInit(): void {
    this.getAllUsers();
  }
  private getAllUsers(): void {
    let tableParams = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };
    this._UsersService.getAllUsers(tableParams).subscribe({
      next: (res) => {
        tableParams = res;
        console.log(res);
        this.dataSource = res.data.map((user: IUser) => ({
          ...user,
          imagePath:
            user.imagePath && user.imagePath !== 'null'
              ? `https://upskilling-egypt.com:3003/${user.imagePath}`
              : 'assets/images/def-avatar.avif',
        }));
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    console.log(e);
    this.getAllUsers();
  }
  viewUser(user: IUser): void {
    const userCopy = JSON.parse(JSON.stringify(user));
    const dialogRef = this.dialog.open(ViewUserComponent, {
      width: '45%',
      data: user,
    });

    this._UsersService.getUserById(user.id).subscribe({
      next: (res) => {},
      error: () => {},
      complete: () => {},
    });
  }
}
