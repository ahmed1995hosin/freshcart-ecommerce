import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangepasswordRoutingModule } from './changepassword-routing.module';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { VerifycodeComponent } from './components/verifycode/verifycode.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UpdataPasswordComponent } from './components/updata-password/updata-password.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ForgetpasswordComponent,
    VerifycodeComponent,
    ResetPasswordComponent,
    UpdataPasswordComponent,
  ],
  imports: [
    CommonModule,
    ChangepasswordRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ChangepasswordModule {}
