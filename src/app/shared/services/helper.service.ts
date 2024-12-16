import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IChangepassword } from 'src/app/auth/interfaces/ichangepassword';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private userNameSub = new BehaviorSubject<string | null>(null);
  $userName = this.userNameSub.asObservable();
  private emailSub = new BehaviorSubject<string | null>(null);
  $email = this.emailSub.asObservable();
  private imagePathSub = new BehaviorSubject<string | null>(null);
  $imagePath = this.imagePathSub.asObservable();
  constructor(private _HttpClient: HttpClient) {}

  onGetCurrentUser(): Observable<any> {
    return this._HttpClient.get('Users/currentUser');
  }
  //may be we will not use this function
  onGetAllProjects(data: any): Observable<any> {
    return this._HttpClient.get('Project', data);
  }
  onChangePassword(changePasswordForm: IChangepassword): Observable<any> {
    return this._HttpClient.put('Users/ChangePassword', changePasswordForm);
  }
  OnGetUserCount(): Observable<any> {
    return this._HttpClient.get('Users/count');
  }
  onTsksCount(): Observable<any> {
    return this._HttpClient.get('Task/count');
  }
}
