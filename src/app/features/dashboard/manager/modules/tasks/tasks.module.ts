import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { ViewTaskComponent } from './components/view-task/view-task.component';

@NgModule({
  declarations: [TasksComponent, ViewTaskComponent],
  imports: [CommonModule, TasksRoutingModule, SharedModule],
})
export class TasksModule {}
