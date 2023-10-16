import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UpdataPasswordComponent } from './components/updata-password/updata-password.component';
import { VerifycodeComponent } from './components/verifycode/verifycode.component';
import { tokenAvailGuard } from './guards/token-avail.guard';
import { tokenUnAvailGuard } from './guards/token-un-avail.guard';

const routes: Routes = [
  {
    path: 'forgetpassword',
    component: ForgetpasswordComponent,
    canActivate: [tokenUnAvailGuard],
    title: 'settings',
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
    canActivate: [tokenUnAvailGuard],
    title: 'settings',
  },
  {
    path: 'updatapassword',
    component: UpdataPasswordComponent,
    canActivate: [tokenAvailGuard],
    title: 'settings',
  },
  {
    path: 'verify',
    component: VerifycodeComponent,
    canActivate: [tokenUnAvailGuard],
    title: 'settings',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangepasswordRoutingModule {}
