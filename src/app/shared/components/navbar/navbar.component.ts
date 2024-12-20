import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HelperService } from '../../services/helper service/helper.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  imagePath: string = '';
  email: string = '';
  userName: string = '';
  constructor(
    private _HelperService: HelperService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    this._HelperService.onGetCurrentUser().subscribe({
      next: (res: any) => {
        this._HelperService.$userName.subscribe(
          (userName) => (this.userName = userName)
        );
        this._HelperService.$email.subscribe((email) => (this.email = email));
        this._HelperService.$imagePath.subscribe(
          (imagePath) => (this.imagePath = imagePath)
        );
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  logout(): void {
    this._AuthService.onLogout();
  }
}
