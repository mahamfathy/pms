import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _HttpClient: HttpClient) {}

  onTasksCount(): Observable<any> {
    return this._HttpClient.get('Task/count');
  }
  onGetAllProjects(params: any): Observable<any> {
    return this._HttpClient.get('Project/employee', { params });
  }
}
