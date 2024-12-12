import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/shared/components/home/home.component';
import { DashboardComponent } from './dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'manager',
        // canActivate: [managerGuard],
        loadChildren: () =>
          import('./manager/manager.module').then((m) => m.ManagerModule),
      },
      {
        path: 'employee',
        // canActivate: [employeeGuard],
        loadChildren: () =>
          import('./employee/employee.module').then((m) => m.EmployeeModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
