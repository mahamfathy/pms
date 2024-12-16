import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  imagePath: string = '';
  email: string = '';
  userName: string = '';
  constructor(private _HelperService: HelperService) {}
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
}
