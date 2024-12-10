import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerProjectsRoutingModule } from './manager-projects-routing.module';
import { ManagerProjectsComponent } from './manager-projects.component';


@NgModule({
  declarations: [
    ManagerProjectsComponent
  ],
  imports: [
    CommonModule,
    ManagerProjectsRoutingModule
  ]
})
export class ManagerProjectsModule { }
