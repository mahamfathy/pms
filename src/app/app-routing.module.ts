import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'manager', loadChildren: () => import('./features/dashboard/manager/manager.module').then(m => m.ManagerModule) }, { path: 'employee', loadChildren: () => import('./features/dashboard/employee/employee.module').then(m => m.EmployeeModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
