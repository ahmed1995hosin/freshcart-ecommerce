import { AuthenticationService } from './../../../services/authentication-service.service';
import { Component, OnInit } from '@angular/core';
import { UpdatauserdataService } from '../../services/updatauserdata.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private _UpdatauserdataService: UpdatauserdataService,
    private _Router: Router,
    private toastr: ToastrService,
    private _AuthenticationService: AuthenticationService
  ) {}
  isloading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  email: string = '';
  ngOnInit(): void {
    this._UpdatauserdataService.email.subscribe({
      next: (data) => {
        this.email = data;
      },
    });
  }
  resetform: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    ]),
  });

  reset(formReset: FormGroup): void {
    if (formReset.valid) {
      this.isloading = true;
      this.errorMessage = '';

      formReset.value.email = this.email;
      this._UpdatauserdataService.resetPass(formReset.value).subscribe({
        next: (data) => {
          console.log(data);
          this.isloading = false;
          this._AuthenticationService.userToken.next(data.token);
          // localStorage.setItem('token', data.token);
          this.toastr.success(
            'your password has been changed login!',
            'success'
          );
          this._AuthenticationService.logOut();

          // nunjnnuhuy6tt6
        },
        error: (err) => {
          console.log(err);
          this.isloading = false;
          this.errorMessage = err.error.messag;
          this.toastr.error(this.errorMessage, 'enter your email again');
          setTimeout(() => {
            this._Router.navigate(['/settings', 'forgetpassword']);
          }, 700);
        },
      });
    }

    // console.log(formReset.value);
  }
}
