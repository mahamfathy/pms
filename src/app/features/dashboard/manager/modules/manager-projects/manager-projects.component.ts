import { Component } from '@angular/core';
import { ManagerProjectsService } from './services/manager-projects.service';
import { IProjectslist } from './interfaces/iproject';
import { MatDialog } from '@angular/material/dialog';
import { ViewProjectComponent } from './components/view-project/view-project.component';
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manager-projects',
  templateUrl: './manager-projects.component.html',
  styleUrls: ['./manager-projects.component.scss'],
})
export class ManagerProjectsComponent {
  projectsList: IProjectslist[] = [];
deletedProject : IProjectslist = {} as IProjectslist
  constructor(
    private _ManagerProjectsService: ManagerProjectsService,
    public _MatDialog: MatDialog,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllProjects();
  }
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
  openDialogDelete(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    projectDetails: IProjectslist
  ): void {
    const dialogRef = this._MatDialog.open(DeleteItemComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: projectDetails,
    });
    console.log(projectDetails);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // console.log(result);
        this.deletedProject = result
        this.deleteProject(result.id);
      }
    });
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
  deleteProject(projectId: number): void {
    this._ManagerProjectsService.onDeleteProjects(projectId).subscribe({
      next: (res) => {
        // console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._ToastrService.error(`${this.deletedProject.title} removed`);
        this.getAllProjects()
      },
    });
  }
}
