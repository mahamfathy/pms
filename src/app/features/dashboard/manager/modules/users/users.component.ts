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
  moduleName: string = 'users';

  readonly dialog = inject(MatDialog);
  defaultImage: string = 'assets/images/def-avatar.avif';
  pageSize: number = 10;
  pageNumber: number = 1;
  tableRes: any;
  searchVal: string = '';
  email: string = '';
  country: string = '';
  searchBy: string = 'userName';
  searchPlaceholder: string = 'Search by User Name';
  searchLabel: string = 'user name';
  searchIcon: string = 'person';
  roleId: number[] = [1, 2];
  displayedColumns: string[] = [
    'userName',
    'imagePath',
    'email',
    'country',
    'phoneNumber',
    'isActivated',
    'actions',
  ];
  actions: any[] = [
    {
      name: 'View',
      icon: 'visibility',
    },
    { name: 'Block', icon: 'block' },
    { name: 'Unblock', icon: 'lock_open' },
  ];
  dataSource: IUser[] = [];
  constructor(private _UsersService: UsersService) {}
  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(): void {
    let tableParams = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      [this.searchBy]: this.searchVal,
      groups: this.roleId,
    };
    this._UsersService.getAllUsers(tableParams).subscribe({
      next: (res) => {
        console.log(res);
        this.tableRes = res;
        this.dataSource = res.data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex - 1;
    console.log(e);
    this.getAllUsers();
  }
  updateSearchPlaceholder(): void {
    if (this.searchBy === 'userName') {
      this.searchPlaceholder = 'Search by User Name';
      this.searchIcon = 'person';
      this.searchLabel = 'User Name';
    } else if (this.searchBy === 'email') {
      this.searchPlaceholder = 'Search by Email';
      this.searchIcon = 'email';
      this.searchLabel = 'Email';
    } else if (this.searchBy === 'country') {
      this.searchPlaceholder = 'Search by Country';
      this.searchIcon = 'public';
      this.searchLabel = 'Country';
    }
  }
  viewUser(user: IUser): void {
    const userCopy = JSON.parse(JSON.stringify(user));
    const dialogRef = this.dialog.open(ViewUserComponent, {
      width: '45%',
      data: user,
    });
  }
  blockUser(user: IUser): void {
    this._UsersService.blockUser(user.id).subscribe({
      next: () => {
        this.getAllUsers();
      },
      error: (err) => {
        console.error('Error blocking user:', err);
      },
    });
  }
  clearFilters(): void {
    this.searchVal = '';
    this.roleId = [1, 2];
    this.searchPlaceholder = 'Search by User Name';
    this.searchIcon = 'person';
    this.searchLabel = 'user name';
    this.searchBy = 'userName';
    this.getAllUsers();
  }
}
