import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerProjectsRoutingModule } from './manager-projects-routing.module';
import { ManagerProjectsComponent } from './manager-projects.component';
import { CreateNewProjectComponent } from './components/create-new-project/create-new-project.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ManagerProjectsComponent,
    CreateNewProjectComponent
  ],
  imports: [
    CommonModule,
    ManagerProjectsRoutingModule,
    SharedModule
  ]
})
export class ManagerProjectsModule { }
