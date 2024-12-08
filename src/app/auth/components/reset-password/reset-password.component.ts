import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router : Router,
    private _FormBuilder :  FormBuilder
    
  ) {}
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  resetPasswordForm: FormGroup = this._FormBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    seed: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      ),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ]),
  },
  { validator: [this.checkPassword] } as FormControlOptions);
  public get formData(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.resetPasswordForm.controls;
  }
  checkPassword(group: AbstractControl) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    if (confirmPassword?.value === '') {
      confirmPassword?.setErrors({ required: true });
    } else if (confirmPassword?.value !== password?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    }
  }
  ResetPassword(data: FormGroup): void {
    if (this.resetPasswordForm.valid) {
      this._AuthService.onResetPassword(data.value).subscribe({
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
