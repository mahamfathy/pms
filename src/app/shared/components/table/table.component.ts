import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from 'src/app/features/dashboard/manager/modules/users/interfaces/IUser';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() actions: any[] = [];
  @Output() userViewed = new EventEmitter<any>();
  constructor() {}

  viewUser(user: IUser): void {
    this.userViewed.emit(user);
  }
  ngOnChanges(): void {
    console.log(this.displayedColumns);
    console.log(this.dataSource);
  }
}
