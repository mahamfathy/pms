import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isSidebarExpanded = true;
  onToggleSidebar(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }
}
