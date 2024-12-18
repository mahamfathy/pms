import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { IUser } from '../../../users/interfaces/IUser';
import { IProject } from '../../../manager-projects/interfaces/iproject';
import { ITaskUsers } from '../../interfaces/itask-users';
import { ITaskProjects } from '../../interfaces/itask-projects';
import { ToastrService } from 'ngx-toastr';
import { Itasks } from '../../interfaces/itasks';

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
    private _ToastrService: ToastrService,
    private route: ActivatedRoute
  ) {}

  id!: any;
  dataArrived: boolean = false;

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

    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log('Updated ID:', +this.id);
    });
    if (this.id !== ' ') {
      this._TasksService.getTaskById(this.id).subscribe({
        next: (res: any) => {
          // console.log(res);

          this.addTaskForm.get('title')?.setValue(res?.title);
          this.addTaskForm.get('description')?.setValue(res?.description);
          this.addTaskForm.get('projectId')?.setValue(res?.project.id);
          this.addTaskForm.get('employeeId')?.setValue(res?.employee.id);
          this.dataArrived = true;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

    this._TasksService.getProjects(myparms).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.projects = res.data;
        this.dataArrived = true;
      },
      error: (err) => {
        console.log(err);
        this.dataArrived = true;
      },
    });

    this._TasksService.getUsers(myparms).subscribe({
      next: (res) => {
        // console.log(res);
        this.users = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sendData() {
    if (this.id == 0) {
      this._TasksService.addTask(this.addTaskForm.value).subscribe({
        next: (res) => {
          // console.log(res);
          this._ToastrService.success('Added Task', 'Successfully');
          this._Router.navigate(['/dashboard/manager/tasks']);
        },
        error: (err) => {
          console.log(err);
          this._ToastrService.error(err.message, 'Error');
        },
      });
    } else {
      this._TasksService
        .updateTaskById(this.id, {
          title: this.addTaskForm.value.title,
          description: this.addTaskForm.value.description,
          employeeId: this.addTaskForm.value.employeeId,
        })
        .subscribe({
          next: (res) => {
            // console.log(res);
            this._ToastrService.success('Edited Task', 'Successfully');
            this._Router.navigate(['/dashboard/manager/tasks']);
          },
          error: (err) => {
            console.log(err);
            this._ToastrService.error(err.message, 'Error');
          },
        });
    }
  }
}
