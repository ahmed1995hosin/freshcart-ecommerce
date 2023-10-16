import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdatauserdataService } from '../../services/updatauserdata.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-updata-password',
  templateUrl: './updata-password.component.html',
  styleUrls: ['./updata-password.component.css'],
})
export class UpdataPasswordComponent {
  constructor(
    private _Router: Router,
    private _UpdatauserdataService: UpdatauserdataService,
    private toastr: ToastrService,
    private _AuthenticationService: AuthenticationService
  ) {}
  isloaded: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  updateForm: FormGroup = new FormGroup({
    currentPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    ]),
    rePassword: new FormControl('', [Validators.required]),
  });

  // forget function
  forget(data: FormGroup): void {
    this.isloaded = true;
    this.successMessage = '';
    this.errorMessage = '';
    data.markAllAsTouched();
    if (data.valid) {
      this._UpdatauserdataService.updataPass(data.value).subscribe({
        next: (value) => {
          console.log(value);
          if (value.message === 'success') {
            this.successMessage = value.message;
            this.toastr.success('password has been changed', 'success');
            this._AuthenticationService.userToken.next(value.token);
            this._AuthenticationService.userinfo.next(value.user);
            this.isloaded = false;
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isloaded = false;
        },
      });
    }
  }
}
