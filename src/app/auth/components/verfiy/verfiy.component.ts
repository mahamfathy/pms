import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verfiy',
  templateUrl: './verfiy.component.html',
  styleUrls: ['./verfiy.component.scss'],
})
export class VerfiyComponent {
  constructor(
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService
  ) {}

  verifyForm = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required]],
  });

  sendData() {
    console.log(this.verifyForm.value);
  }
}
