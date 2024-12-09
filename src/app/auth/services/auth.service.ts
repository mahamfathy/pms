import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { ILogin } from '../interfaces/ILogin';
import { IResetPassword } from '../interfaces/IResetPassword';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userGroup: string | null = '';
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  onLogin(loginForm: ILogin): Observable<any> {
    return this._HttpClient.post('Users/Login', loginForm);
  }
  onRegister(registerForm: FormData): Observable<any> {
    return this._HttpClient.post('Users/Register', registerForm);
  }
  onVerify(verifyForm: any): Observable<any> {
    return this._HttpClient.put('Users/verify', verifyForm);
  }
  onResetRequest(resetReq: any): Observable<any> {
    return this._HttpClient.post('Users/Reset/Request', resetReq);
  }
  onResetPassword(resetPassForm: IResetPassword): Observable<any> {
    return this._HttpClient.post('Users/Reset', resetPassForm);
  }

  getProfile(): void {
    const userToken: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(userToken);
    localStorage.setItem('userEmail', decoded.userEmail);
    localStorage.setItem('userGroup', decoded.userGroup);
    this.getUserGroup();
  }
  getUserGroup() {
    if (
      localStorage.getItem('userToken') !== null &&
      localStorage.getItem('userGroup') !== null
    ) {
      this.userGroup = localStorage.getItem('userGroup');
    }
    return this.userGroup;
  }
  onLogout(): void {
    localStorage.clear();
    this._Router.navigate(['/auth']);
  }
}
