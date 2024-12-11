import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';

const routes: Routes = [
  { path: '', component: ManagerComponent },
  {
    path: 'manager-projects',
    loadChildren: () =>
      import('./modules/manager-projects/manager-projects.module').then(
        (m) => m.ManagerProjectsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
