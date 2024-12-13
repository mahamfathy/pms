import { Component } from '@angular/core';
import { ManagerProjectsService } from './services/manager-projects.service';
import { IProjectslist } from './interfaces/iproject';
import { MatDialog } from '@angular/material/dialog';
import { ViewProjectComponent } from './components/view-project/view-project.component';
@Component({
  selector: 'app-manager-projects',
  templateUrl: './manager-projects.component.html',
  styleUrls: ['./manager-projects.component.scss'],
})
export class ManagerProjectsComponent {
  projectsList: IProjectslist[] = [];
  constructor(
    private _ManagerProjectsService: ManagerProjectsService,
    public _MatDialog: MatDialog
  ) {}
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    projectData: IProjectslist
  ): void {
    this._MatDialog.open(ViewProjectComponent, {
      width: '60%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: projectData,
    });
    // console.log(projectData);
  }
  ngOnInit(): void {
    this.getAllProjects();
  }
  getAllProjects(): void {
    let param = {
      pageSize: 10,
      pageNumber: 1,
      title: '',
    };
    this._ManagerProjectsService.onGetAllProjects(param).subscribe({
      next: (res) => {
        // console.log(res);
        this.projectsList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
