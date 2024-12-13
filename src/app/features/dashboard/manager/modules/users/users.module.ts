import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

@NgModule({
  declarations: [UsersComponent, AddUserComponent, ViewUserComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
