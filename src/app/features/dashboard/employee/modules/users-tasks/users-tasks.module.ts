import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersTasksRoutingModule } from './users-tasks-routing.module';
import { UsersTasksComponent } from './users-tasks.component';


@NgModule({
  declarations: [
    UsersTasksComponent
  ],
  imports: [
    CommonModule,
    UsersTasksRoutingModule
  ]
})
export class UsersTasksModule { }
