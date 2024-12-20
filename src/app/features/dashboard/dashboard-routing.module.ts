import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { employeeGuard } from 'src/app/core/guards/employee.guard';
import { managerGuard } from 'src/app/core/guards/manager.guard';
import { HomeComponent } from 'src/app/shared/components/home/home.component';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { DashboardComponent } from './dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'employee', component: EmployeeComponent },

      {
        path: 'manager',
        canActivate: [managerGuard],
        loadChildren: () =>
          import('./manager/manager.module').then((m) => m.ManagerModule),
      },
      {
        path: 'employee',
        canActivate: [employeeGuard],
        loadChildren: () =>
          import('./employee/employee.module').then((m) => m.EmployeeModule),
      },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
