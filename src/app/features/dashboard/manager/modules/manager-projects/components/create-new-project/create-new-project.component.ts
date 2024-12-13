import { Component } from '@angular/core';
import { ManagerProjectsService } from '../../services/manager-projects.service';
import { IProject } from '../../interfaces/iproject';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.scss'],
})
export class CreateNewProjectComponent {
  projectId: number = 0;
  projectDetails : IProject = {} as IProject
  addOrEditProject: boolean = true
  constructor(
    private _ManagerProjectsService: ManagerProjectsService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.projectId = _ActivatedRoute.snapshot.params['id'];
  }
  createNewProjectForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    if (this.projectId) {
      this.getProjectById(this.projectId);
      this.addOrEditProject = false
    }
  }
  createNewProject(infoProject: FormGroup): void {
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
          this._ToastrService.success('New project added successfully');
          this._Router.navigateByUrl('/dashboard/manager/manager-projects');
        },
      });
  }
  editProject(infoProject: FormGroup): void {
  infoProject.value.id = this.projectId
  this._ManagerProjectsService.onEditProject(infoProject.value, this.projectId).subscribe({
    next:(res)=> {
      console.log(res);
    }, error:(err)=> {
      console.log(err);
    }, complete:()=> {
      this._ToastrService.success('Project edited successfully'),
      this._Router.navigateByUrl('/dashboard/manager/manager-projects');
    }
  })

  }
  getProjectById(id: number): void {
    this._ManagerProjectsService.onGrtProjectById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.projectDetails =res
      },
      error: (err) => {
        console.log(err);
      },complete:()=> {
        this.createNewProjectForm.patchValue({
          title: this.projectDetails.title,
          description: this.projectDetails.description
        })
      }
    });
  }
}
