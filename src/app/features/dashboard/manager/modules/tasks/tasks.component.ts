import { Component } from '@angular/core';
import { Itasks } from './interfaces/itasks';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  dataSource!: Itasks[];
  displayedColumns: string[] = [
    'title',
    'status',
    'description',
    'creationDate',
    'project',
    'actions',
  ];
  actions: any[] = [
    {
      name: 'View',
      icon: 'visibility',
    },
    {
      name: 'Edit',
      icon: 'edit',
    },
    {
      name: 'Delete',
      icon: 'delete',
    },
  ];
  constructor(private _TasksService: TasksService) {}

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
