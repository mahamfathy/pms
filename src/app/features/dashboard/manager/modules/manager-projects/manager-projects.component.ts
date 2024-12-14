import { Component } from '@angular/core';
import { ManagerProjectsService } from './services/manager-projects.service';
import { IProjectslist } from './interfaces/iproject';
import { MatDialog } from '@angular/material/dialog';
import { ViewProjectComponent } from './components/view-project/view-project.component';
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-manager-projects',
  templateUrl: './manager-projects.component.html',
  styleUrls: ['./manager-projects.component.scss'],
})
export class ManagerProjectsComponent {
  projectsList: IProjectslist[] = [];
  dataSource: IProjectslist[] = [];
  deletedProject: IProjectslist = {} as IProjectslist;
  finalResponce : any;
  pageSize: number = 10;
  pageNumber: number = 1;
  displayedColumns: string[] = [
    'title',
    'creationDate',
    'task',
    'modificationDate',
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
  constructor(
    private _ManagerProjectsService: ManagerProjectsService,
    public _MatDialog: MatDialog,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex ;
    // console.log(e);
    this.getAllProjects();
  }
  ngOnInit(): void {
    this.getAllProjects();
  }
  openDialogDelete(
    projectDetails: any
  ): void {
    const dialogRef = this._MatDialog.open(DeleteItemComponent, {
      width: '50%',
      data: projectDetails,
    });
    // console.log(projectDetails);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.deletedProject = result;
        this.deleteProject(result.id);
      }
    });
  }
  getAllProjects(): void {
    let param = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      title: '',
    };
    this._ManagerProjectsService.onGetMyProjectsForManager(param).subscribe({
      next: (res) => {
        // console.log(res);
        // this.projectsList = res.data;
        this.dataSource = res.data;
        this.finalResponce = res
        // console.log(this.projectsList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteProject(projectId: number): void {
    // console.log(projectId);
    this._ManagerProjectsService.onDeleteProjects(projectId).subscribe({
      next: (res) => {
        // console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._ToastrService.error(`${this.deletedProject.title} removed`);
        this.getAllProjects();
      },
    });
  }
  viewProject(project: IProjectslist){
    const dialogRef = this._MatDialog.open(ViewProjectComponent, {
      width: '60%',
      data: project,
    });
    this._ManagerProjectsService.onGetProjectById(project.id).subscribe({
      next: (res)=> {
        // console.log(res)
      }, error: (err) => {
        console.log(err)
      }
    })
  }
navigateToEditProject(projectDetails: any):void {
  const params = {id: projectDetails.id}
this._Router.navigateByUrl(`/dashboard/manager/manager-projects/create-project/${projectDetails.id}`)
console.log(projectDetails);
console.log(projectDetails.id);
}
}
