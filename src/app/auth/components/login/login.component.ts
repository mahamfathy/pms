import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router : Router
  ) {}
  hide: boolean = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      ),
    ]),
  });
  public get formData(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.loginForm.controls;
  }
  login(data: FormGroup): void {
    if (this.loginForm.valid) {
      this._AuthService.onLogin(data.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('userToken', res.token)
        },
        error: (err) => {
          console.log(err);
          this._ToastrService.error(err.error.message)
        },complete:()=>{
          this._ToastrService.success('You have been successfully loged in')
          this._Router.navigate(['/dashboard'])
        }
      });
    }
  }
}
