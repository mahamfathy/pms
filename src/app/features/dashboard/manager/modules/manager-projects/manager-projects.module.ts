import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerProjectsRoutingModule } from './manager-projects-routing.module';
import { ManagerProjectsComponent } from './manager-projects.component';
import { CreateNewProjectComponent } from './components/create-new-project/create-new-project.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManagerProjectsComponent,
    CreateNewProjectComponent
  ],
  imports: [
    CommonModule,
    ManagerProjectsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ManagerProjectsModule { }
