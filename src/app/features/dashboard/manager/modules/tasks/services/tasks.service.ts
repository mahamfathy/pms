import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private _HttpClient: HttpClient) {}

  getAllTasks(parms: any): Observable<any> {
    return this._HttpClient.get('Task/manager', {
      params: parms,
    });
  }

  addTask(data: object): Observable<any> {
    return this._HttpClient.post('Task', data);
  }

  getUsers(data: any): Observable<any> {
    return this._HttpClient.get('Users', {
      params: data,
    });
  }

  getProjects(data: any) {
    return this._HttpClient.get('Project/manager', {
      params: data,
    });
  }
}
