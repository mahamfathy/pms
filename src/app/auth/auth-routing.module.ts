import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetRequestComponent } from './components/reset-request/reset-request.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { VerfiyComponent } from './components/verfiy/verfiy.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', title: 'Login' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'register' },
  { path: 'verify', component: VerfiyComponent, title: 'verify' },
  {
    path: 'reset-request',
    component: ResetRequestComponent,
    title: 'reset password',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
