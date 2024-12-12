import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _HttpClient: HttpClient) {}
  getAllUsers(): Observable<any> {
    return this._HttpClient.get('Users');
  }
  createManager(form: FormData): Observable<any> {
    return this._HttpClient.post('Users/Create', form);
  }
}
