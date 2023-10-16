import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdatauserdataService } from '../../services/updatauserdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent {
  constructor(
    private _Router: Router,
    private _UpdatauserdataService: UpdatauserdataService,
    private toastr: ToastrService
  ) {}
  isloaded: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  forgetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // forget function
  forget(data: FormGroup): void {
    this.isloaded = true;
    this.successMessage = '';
    this.errorMessage = '';
    data.markAllAsTouched();
    if (data.valid) {
      this._UpdatauserdataService
        .forgetPass(data.controls['email'].value)
        .subscribe({
          next: (value) => {
            if (value.statusMsg === 'success') {
              this._UpdatauserdataService.email.next(
                data.controls['email'].value
              );
              this.successMessage = value.message;
              this.toastr.success(this.successMessage, 'success');

              setTimeout(() => {
                this.isloaded = false;
                this._Router.navigate(['/settings', 'verify']);
              }, 700);
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
