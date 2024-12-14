import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  displayedColumns: string[] = [
    'userName',
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
    this._UsersService.getAllUsers().subscribe({
      next: (res) => {
        this.dataSource = res.data;
      },
    });
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
