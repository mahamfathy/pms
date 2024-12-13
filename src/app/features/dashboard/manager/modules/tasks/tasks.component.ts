import { Component } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { Itasks } from './interfaces/itasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  dataSource!: Itasks[];

  constructor(private _TasksService: TasksService) {}

  displayedColumns: string[] = [
    'title',
    'status',
    'description',
    'creationDate',
  ];

  ngOnInit(): void {
    this._TasksService.getAllTasks().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
