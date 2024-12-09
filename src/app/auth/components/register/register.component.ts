import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hideEye1: boolean = true;
  hideEye2: boolean = true;
  resMessage: string = '';

  registerForm: FormGroup = this._FormBuilder.group({
    userName: [
      '',
      [Validators.required, Validators.pattern(/^[A-Za-z]+[0-9]+$/)],
    ],
    email: ['', [Validators.required, Validators.email]],
    country: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  files: File[] = [];
  imgSrc: any;
  constructor(
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.imgSrc = event.addedFiles[0];
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onRegister(data: FormGroup): void {
    let myData = new FormData();
    Object.keys(data.value).forEach((key) => {
      myData.append(key, data.value[key]);
    });
    if (this.files.length > 0) {
      myData.append('profileImage', this.files[0]);
    }

    this._AuthService.onRegister(myData).subscribe({
      next: (res) => {
        this.resMessage = res.message;
        const userEmail = data.value.email;
        localStorage.setItem('userEmail', userEmail);
      },
      error: (err) => {
        if (err.error.message && !err.error.additionalInfo) {
          this._ToastrService.error(err.error.message, 'Error');
        } else {
          const map = new Map(Object.entries(err.error.additionalInfo.errors));
          for (let [msg, val] of map) {
            this._ToastrService.error(JSON.stringify(val), msg);
          }
        }
      },
      complete: () => {
        this._ToastrService.success(this.resMessage, 'Success');
        this._Router.navigateByUrl('/auth/verify-account');
      },
    });
  }
}
