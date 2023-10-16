import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // isloading
  isSubmit: boolean = true;
  isLoading: boolean = false;
  errorsMessage: string = '';
  successMessage: string = '';

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _router: Router
  ) {
    console.log('register');
  }

  // register form group
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(13),
      Validators.pattern(/^[A-Z].*$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(((\+|00)[0-9]{3})|0)[0-9]{10}$/),
    ]),
  });
  // submitRegister
  submitRegister(formRegistration: FormGroup) {
    formRegistration.markAllAsTouched();
    if (formRegistration.valid) {
      this.errorsMessage = '';
      this.successMessage = '';
      this.isSubmit = false;
      this.isLoading = true;
      this._AuthenticationService.register(formRegistration.value).subscribe({
        next: (data) => {
          this.successMessage = data.message;

          if (data.message == 'success') {
            setTimeout(() => {
              this._router.navigate(['/login']);
            }, 700);
          }
        },
        error: (error) => {
          // console.log(error. .error.message);
          this.errorsMessage = error.error.message;

          this.isSubmit = true;
          this.isLoading = false;
        },
        complete: () => {
          this.isSubmit = true;
          this.isLoading = false;
          console.log('complete');
        },
      });
    }
  }
}
