import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IProjectslist } from 'src/app/features/dashboard/manager/modules/manager-projects/interfaces/iproject';
import { Itasks } from 'src/app/features/dashboard/manager/modules/tasks/interfaces/itasks';
import { TasksService } from 'src/app/features/dashboard/manager/modules/tasks/services/tasks service/tasks.service';
import { BlockUserComponent } from 'src/app/features/dashboard/manager/modules/users/components/block-user/block-user.component';
import { IUser } from 'src/app/features/dashboard/manager/modules/users/interfaces/IUser';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource!: any[];
  @Input() displayedColumns: string[] = [];
  @Input() actions: any[] = [];
  @Input() moduleName: string = '';
  @Input() numRows!: number;
  @Output() userViewed = new EventEmitter<any>();
  @Output() editId = new EventEmitter<any>();
  @Output() projectViewed = new EventEmitter<any>();
  @Output() projectDeleted = new EventEmitter<any>();
  @Output() DeletedItem = new EventEmitter<any>();
  @Output() projectEdited = new EventEmitter<any>();
  @Output() userBlocked = new EventEmitter<any>();
  @Output() viewedTask = new EventEmitter<any>();
  data!: any;

  constructor(private _TasksService: TasksService, private dialog: MatDialog) {}

  viewTask(task: Itasks) {
    this.viewedTask.emit(task);
    console.log(task);
  }
  sendEditId(task: Itasks) {
    this.editId.emit(task.id);
  }

  deleteItem(data: any) {
    console.log(data);
    this.DeletedItem.emit(data);
  }

  viewUser(user: IUser): void {
    this.userViewed.emit(user);
  }
  toggleBlock(user: IUser): void {
    const dialogRef = this.dialog.open(BlockUserComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userBlocked.emit(user);
      }
    });
  }
  blockUser(user: IUser): void {
    user.isActivated = false;
    this.userBlocked.emit(user);
  }

  unblockUser(user: IUser): void {
    user.isActivated = true;
    this.userBlocked.emit(user);
  }

  viewProject(project: IProjectslist): void {
    this.projectViewed.emit(project);
    // console.log(project);
  }
  deleteProject(project: IProjectslist): void {
    this.projectDeleted.emit(project);
    // console.log(project);
  }
  editProject(project: IProjectslist): void {
    this.projectEdited.emit(project);
  }
  // ngOnChanges(): void {
  //   this.data = new MatTableDataSource(this.dataSource);
  // }
}
