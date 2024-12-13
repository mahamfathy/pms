import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'add', component: AddEditUserComponent },
  {
    path: 'edit',
    component: AddEditUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
