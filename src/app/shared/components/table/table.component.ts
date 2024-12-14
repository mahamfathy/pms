import { Project } from './../../../features/dashboard/manager/modules/tasks/interfaces/itasks';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProject, IProjectslist } from 'src/app/features/dashboard/manager/modules/manager-projects/interfaces/iproject';
import { IUser } from 'src/app/features/dashboard/manager/modules/users/interfaces/IUser';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() actions: any[] = [];
  @Output() userViewed = new EventEmitter<any>();
  @Output() projectViewed = new EventEmitter<any>()
  @Output() projectDeleted = new EventEmitter<any>()
  @Output() projectEdited = new EventEmitter<any>()

  constructor() {}
  viewUser(user: IUser): void {
    this.userViewed.emit(user);
  }
  viewProject(project: IProjectslist): void {
    this.projectViewed.emit(project);
    // console.log(project);
  }
  deleteProject(project: IProjectslist): void {
this.projectDeleted.emit(project)
// console.log(project);

  }
  editProject(project: IProjectslist) : void {
this.projectEdited.emit(project)

  }
  ngOnChanges(): void {
    // console.log(this.displayedColumns);
    // console.log(this.dataSource);
  }
}
