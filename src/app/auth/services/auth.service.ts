import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../interfaces/ILogin';
import { IVerify } from '../interfaces/IVerify';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}
  onLogin(loginForm: ILogin): Observable<any> {
    return this._HttpClient.post('Users/Login', loginForm);
  }
  onRegister(registerForm: FormData): Observable<any> {
    return this._HttpClient.post('Users/Register', registerForm);
  }
  onVerify(verifyForm: IVerify): Observable<any> {
    return this._HttpClient.post('Users/Verify', verifyForm);
  }
}
