import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private _HttpClient: HttpClient) {}
  onGetCurrentUser(): Observable<any> {
    return this._HttpClient.get('Users/currentUser');
  }
  onGetAllProjects(data: any): Observable<any> {
    return this._HttpClient.get('Project', data);
  }
}
