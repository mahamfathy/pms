import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetRequestComponent } from './components/reset-request/reset-request.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch: 'full', title:'Login'},
  {path: 'login', component: LoginComponent, title: 'Login'},
  { path: 'reset-request', component: ResetRequestComponent, title: 'reset password'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
