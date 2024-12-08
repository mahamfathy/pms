import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetRequestComponent } from './components/reset-request/reset-request.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'reset-request', component: ResetRequestComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
