import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IChangepassword } from 'src/app/auth/interfaces/ichangepassword';
import { routes } from '../../interfaces/routes.model';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private userNameSub = new BehaviorSubject<string>('`');
  $userName = this.userNameSub.asObservable();
  private emailSub = new BehaviorSubject<string>('`');
  $email = this.emailSub.asObservable();
  private imagePathSub = new BehaviorSubject<string>('`');
  $imagePath = this.imagePathSub.asObservable();

  constructor(private _HttpClient: HttpClient) {}

  onGetCurrentUser(): Observable<any> {
    return this._HttpClient.get('Users/currentUser').pipe(
      tap((res: any) => {
        if (res) {
          this.userNameSub.next(res.userName);
          this.emailSub.next(res.email);
          this.imagePathSub.next(
            res.imagePath
              ? 'https://upskilling-egypt.com:3003/' + res.imagePath
              : 'assets/images/def-avatar.avif'
          );
        }
      })
    );
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
  onUpdateProfile(profileForm: FormData): Observable<any> {
    return this._HttpClient.put('Users', profileForm);
  }
}
