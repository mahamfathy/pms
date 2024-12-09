import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../interfaces/ILogin';
import { IResetPassword } from '../interfaces/IResetPassword';
import { IVerify } from '../interfaces/IVerify';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

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
  onVerify(verifyForm: IVerify): Observable<any> {
    return this._HttpClient.post('Users/Verify', verifyForm);
  }
  onResetRequest(resetReq: any): Observable<any> {
    return this._HttpClient.post('Users/Reset/Request', resetReq);
  }
  onResetPassword(resetPassForm: IResetPassword): Observable<any> {
    return this._HttpClient.post('Users/Reset', resetPassForm);
  }
  onGetProfile() {
    let token: any = localStorage.getItem('userToken');
    let decodedToken: any = jwtDecode(token);
    localStorage.setItem('userGroup', decodedToken.userGroup);
    this.onGetRole();
  }
  onGetRole() {
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
