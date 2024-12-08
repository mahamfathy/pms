import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService
  ) {}

  registerForm: FormGroup = this._FormBuilder.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.required]],
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
    let myData = new FormData();

    myData.append('userName', this.registerForm.value.userName);
    myData.append('email', this.registerForm.value.email);
    myData.append('country', this.registerForm.value.country);
    myData.append('phoneNumber', this.registerForm.value.phoneNumber);
    myData.append('password', this.registerForm.value.password);
    myData.append('confirmPassword', this.registerForm.value.confirmPassword);
    myData.append('profileImage', this.imgSrc);

    this._AuthService.onRegister(myData).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'Successfully');
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.message, 'Error');
      },
    });
  }
}
