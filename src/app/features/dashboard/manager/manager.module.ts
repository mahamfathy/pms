import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { ManagerProjectsComponent } from './components/manager-projects/manager-projects.component';

@NgModule({
<<<<<<< HEAD
  declarations: [
    ManagerComponent,
    ManagerProjectsComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
=======
  declarations: [ManagerComponent],
  imports: [CommonModule, ManagerRoutingModule, SharedModule],
>>>>>>> 9690301 ([feat] component navbar : fininsh html and styling)
})
export class ManagerModule {}
