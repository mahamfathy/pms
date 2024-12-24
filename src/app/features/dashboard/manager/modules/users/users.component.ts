import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { IUser } from './interfaces/IUser';
import { UsersService } from './services/users services/users.service';
import { Sort } from '@angular/material/sort';
import { BlockUserComponent } from './components/block-user/block-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  moduleName: string = 'users';
  readonly dialog = inject(MatDialog);
  filterType: string = 'All';
  pageSize: number = 10;
  pageNumber: number = 1;
  tableRes: any;
  searchVal: string = '';
  email: string = '';
  country: string = '';
  searchBy: string = 'userName';
  searchPlaceholder: string = 'Search by User Name';
  searchLabel: string = 'User name';
  searchIcon: string = 'person';
  roleId: number[] = [1, 2];
  actions: any[] = [
    {
      name: 'View',
      icon: 'visibility',
    },
    { name: 'Block', icon: 'block' },
    { name: 'Unblock', icon: 'lock_open' },
  ];
  dataSource: IUser[] = [];
  sortedData: IUser[] = [];
  constructor(private _UsersService: UsersService) {}
  ngOnInit(): void {
    this.getAllUsers();
  }
  ngAfterViewInit(): void {
    this.sortedData = this.dataSource.slice();
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
        this.tableRes = res;
        this.dataSource = res.data;
    this.sortedData = this.dataSource.slice();

      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }
  getMyUsers(): void {
    let tableParams = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };
    this._UsersService.getUsersOfManager(tableParams).subscribe({
      next: (res) => {
        this.dataSource = res.data;
      },
      error: () => {},
    });
  }
  onFilterTypeChange(): void {
    if (this.filterType === 'all') {
      this.getAllUsers();
    } else if (this.filterType === 'my') {
      this.getMyUsers();
    }
  }
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.getAllUsers();
  }
  updateSearchPlaceholder(searchTerm: string): void {
    this.searchPlaceholder = `Search by ${searchTerm}`;
    this.searchIcon = searchTerm === 'country' ? 'public' : searchTerm;
    this.searchLabel = `${searchTerm}`;
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
  toggleBlock(user: IUser): void {
    const dialogRef = this.dialog.open(BlockUserComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.blockUser(user);
      }
    });
  }
  clearFilters(): void {
    this.searchVal = '';
    this.roleId = [1, 2];
    this.searchPlaceholder = 'Search by User Name';
    this.searchIcon = 'person';
    this.searchLabel = 'User name';
    this.searchBy = 'userName';
    this.filterType = 'all';
    this.getAllUsers();
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
        case 'isActivated':
          return compare(a.isActivated, b.isActivated, isAsc);
        case 'phoneNumber':
          return compare(a.phoneNumber, b.phoneNumber, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'country':
          return compare(a.country, b.country, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

