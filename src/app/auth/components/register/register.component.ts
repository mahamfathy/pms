import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  hideEye1: boolean = true;
  hideEye2: boolean = true;

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

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.imgSrc = event.addedFiles[0];
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  sendData() {
    let entries = Object.entries(this.registerForm.value);

    let myData = new FormData();

    entries.forEach((entry) => {
      myData.append(`${entry[0]}`, `${entry[1]}`);
    });

    myData.append('profileImage', this.imgSrc);

    this._AuthService.onRegister(myData).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'Successfully');
        this._Router.navigate(['/auth/verify']);
      },
      error: (err) => {
        console.log(err);

        if (err.error.additionalInfo?.errors) {
          let mapErrors = new Map(
            Object.entries(err.error.additionalInfo?.errors)
          );

          for (const [msg, val] of mapErrors) {
            this._ToastrService.error(`${val}`, `${msg} Error`);
          }
        } else {
          this._ToastrService.error(err.error.message, 'Error');
        }
      },
    });
  }
}
