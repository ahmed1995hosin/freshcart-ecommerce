import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _router: Router,
    private _AuthenticationService: AuthenticationService
  ) {}
  // ahmedrrr@gmail.com

  isLoading: boolean = false;
  isSubmit: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  LogInInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    ]),
  });

  // log in event handlers ng submit
  login(formLogIN: FormGroup): void {
    formLogIN.markAllAsTouched();
    if (formLogIN.valid) {
      this.errorMessage = '';
      this.successMessage = '';
      this.isLoading = true;
      this.isSubmit = false;
      this._AuthenticationService.login(formLogIN.value).subscribe({
        next: (data: any) => {
          this.isLoading = false;
          this.isSubmit = true;

          if (data.message == 'success') {
            this.successMessage = data.message;
            this._AuthenticationService.userToken.next(data.token);
            //
            this._AuthenticationService.userinfo.next(data.user);
            this._router.navigate(['home']);
          }
        },
        error: (err: any) => {
          this.errorMessage = err.error.message;
          this.isLoading = false;
          this.isSubmit = true;
        },
      });
    }
  }
}
