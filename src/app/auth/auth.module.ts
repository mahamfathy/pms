import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetRequestComponent } from './components/reset-request/reset-request.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [ResetRequestComponent, LoginComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
