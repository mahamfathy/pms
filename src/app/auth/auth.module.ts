import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetRequestComponent } from './components/reset-request/reset-request.component';
import { RegisterComponent } from './components/register/register.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [ResetRequestComponent, RegisterComponent,LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
  ],

})
export class AuthModule {}
