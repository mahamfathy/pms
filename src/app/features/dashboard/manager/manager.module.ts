import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
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
    ManagerRoutingModule,SharedModule
  ]
 
})
export class ManagerModule {}
