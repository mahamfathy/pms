import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _HttpClient: HttpClient) {}
  getAllUsers(data: any): Observable<any> {
    return this._HttpClient.get('Users', { params: data });
  }
  createManager(form: FormData): Observable<any> {
    return this._HttpClient.post('Users/Create', form);
  }
  getUserById(id: number): Observable<any> {
    return this._HttpClient.get(`Users/${id}`);
  }
  getUsersOfManager(): Observable<any> {
    return this._HttpClient.get('Users/Manager');
  }
  blockUser(id: number): Observable<any> {
<<<<<<< HEAD
<<<<<<< HEAD
    return this._HttpClient.put(`Users/${id}`, { HttpParams: id });
=======
    return this._HttpClient.put(`Users/${id}`, id);
>>>>>>> 4511bd1 ([feat]users service : createblock method)
=======
    return this._HttpClient.put(`Users/${id}`, { HttpParams: id });
>>>>>>> 8b9514c ([feat] block user : finish in activate component)
  }
}
