import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { ManagerProjectsComponent } from './components/manager-projects/manager-projects.component';


@NgModule({
  declarations: [
    ManagerComponent,
    ManagerProjectsComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
