import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { IUser } from '../../../users/interfaces/IUser';
import { IProject } from '../../../manager-projects/interfaces/iproject';
import { ITaskUsers } from '../../interfaces/itask-users';
import { ITaskProjects } from '../../interfaces/itask-projects';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _TasksService: TasksService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  users: ITaskUsers[] = [];
  projects: ITaskProjects[] = [];
  userId: string = '';
  projectId: string = '';

  addTaskForm: FormGroup = this._FormBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    projectId: ['', [Validators.required]],
    employeeId: ['', [Validators.required]],
  });

  ngOnInit(): void {
    let myparms = {
      pageSize: 1000,
      pageNumber: 1,
    };

    this._TasksService.getProjects(myparms).subscribe({
      next: (res: any) => {
        console.log(res);
        this.projects = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._TasksService.getUsers(myparms).subscribe({
      next: (res) => {
        console.log(res);
        this.users = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sendData() {
    this._TasksService.addTask(this.addTaskForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success('Added Task', 'Successfully');
        this._Router.navigate(['/dashboard/manager/tasks']);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.message, 'Error');
      },
    });
  }
}
