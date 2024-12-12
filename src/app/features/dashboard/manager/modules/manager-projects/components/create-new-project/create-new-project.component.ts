import { Component } from '@angular/core';
import { ManagerProjectsService } from '../../services/manager-projects.service';
import { IProject } from '../../interfaces/iproject';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.scss'],
})
export class CreateNewProjectComponent {
  constructor(
    private _ManagerProjectsService: ManagerProjectsService,
    private _ToastrService: ToastrService,
    private _Router : Router
  ) {}
  createNewProjectForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });
  createNewProject(infoProject: FormGroup) {
    console.log(infoProject.value);
    this._ManagerProjectsService
      .onCreateNewProject(infoProject.value)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this._ToastrService.success('project added successfully')
          this._Router.navigate(['../'])
        },
      });
  }
}
