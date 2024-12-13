import { Component, Input } from '@angular/core';
import { Itasks } from 'src/app/features/dashboard/manager/modules/tasks/interfaces/itasks';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource: Itasks[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() actions: any[] = [];
  constructor() {}

  ngOnChanges(): void {
    console.log(this.displayedColumns);
    console.log(this.dataSource);
  }
}
