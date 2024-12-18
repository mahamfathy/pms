import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IChangepassword } from 'src/app/auth/interfaces/ichangepassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _HttpClient: HttpClient) {}
  onGetCurrentUser(): Observable<any> {
    return this._HttpClient.get('Users/currentUser')
  }
  onTasksCount(): Observable<any> {
    return this._HttpClient.get('Task/count');
  }
  onGetAllProjects(params:any): Observable<any> {
    return this._HttpClient.get('Project/employee', {params});
  }
}
