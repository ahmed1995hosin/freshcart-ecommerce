import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UpdatauserdataService } from '../../services/updatauserdata.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.component.html',
  styleUrls: ['./verifycode.component.css'],
})
export class VerifycodeComponent {
  constructor(
    private _Router: Router,
    private _UpdatauserdataService: UpdatauserdataService,
    private toastr: ToastrService
  ) {}
  isloaded: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  verifyForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });

  // forget function
  Verify(data: FormGroup): void {
    this.isloaded = true;
    this.successMessage = '';
    this.errorMessage = '';
    // console.log(data.controls['resetCode']);
    data.markAllAsTouched();
    if (data.valid) {
      this._UpdatauserdataService
        .verifyCode(data.controls['resetCode'].value)
        .subscribe({
          next: (value) => {
            console.log(value);
            if (value.status === 'Success') {
              this.successMessage = value.status;
              this.toastr.success(
                'verifiy the code was successfully',
                value.status
              );

              setTimeout(() => {
                this.isloaded = false;
                this._Router.navigate(['/settings', 'resetpassword']);
              }, 700);
            }
          },
          error: (err) => {
            this.errorMessage = err.error.message;
            this.isloaded = false;
          },
        });
    }
  }
}
