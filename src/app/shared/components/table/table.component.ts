import { Component, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Itasks } from 'src/app/features/dashboard/manager/modules/tasks/interfaces/itasks';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource: Itasks[] = [];
  @Input() displayedColumns: string[] = [];
  constructor() {}

  ngOnChanges(): void {
    console.log(this.displayedColumns);
    console.log(this.dataSource);
  }
}
