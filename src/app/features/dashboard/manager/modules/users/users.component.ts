import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/IUser';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  sourceData: IUser[] = [];
  displayedColumns: string[] = [];
  constructor(private _UsersService: UsersService) {}
  ngOnInit(): void {
    this.getAllUsers();
  }
  private getAllUsers(): void {
    this._UsersService.getAllUsers().subscribe({
      next: (res) => {
        this.sourceData = res.data;
      },
    });
  }
}
