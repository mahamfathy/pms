import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent, AddEditUserComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
