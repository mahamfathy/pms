import { Component } from '@angular/core';
import { ManagerProjectsService } from '../../services/manager-projects.service';
import { IProject } from '../../interfaces/iproject';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.scss']
})
export class CreateNewProjectComponent {
constructor(private _ManagerProjectsService : ManagerProjectsService){}
createNewProjectForm = new FormGroup({
  title: new FormControl('', [Validators.required]),
  description: new FormControl('')
});
createNewProject(infoProject: FormGroup) {
  this._ManagerProjectsService.onCreateNewProject(infoProject.value).subscribe({
    next:(res) => {
      console.log(res);
    }, error :(err) => {
      console.log(err);
    }
  })
}
}
