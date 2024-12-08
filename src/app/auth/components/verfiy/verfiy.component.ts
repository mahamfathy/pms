import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verfiy',
  templateUrl: './verfiy.component.html',
  styleUrls: ['./verfiy.component.scss'],
})
export class VerfiyComponent {
  constructor(
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  verifyForm = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required]],
  });

  sendData() {
    this._AuthService.onVerify(this.verifyForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'Successfully');
        this._Router.navigate(['/auth/login']);
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
