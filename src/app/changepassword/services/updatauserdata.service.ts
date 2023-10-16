import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UpdatauserdataService {
  constructor(private _HttpClient: HttpClient) {}
  // handle email
  email: BehaviorSubject<string> = new BehaviorSubject('');
  //  forget password
  forgetPass(email: string): Observable<any> {
    return this._HttpClient.post(
      environment.baseURl + `/api/v1/auth/forgotPasswords`,
      {
        email: email,
      }
    );
  }
  // send verify  code email
  verifyCode(code: string): Observable<any> {
    return this._HttpClient.post(
      environment.baseURl + `/api/v1/auth/verifyResetCode`,
      {
        resetCode: `${code}`,
      }
    );
  }
  // update password
  updataPass(userInfo: any): Observable<any> {
    return this._HttpClient.put(
      environment.baseURl + `/api/v1/users/changeMyPassword`,

      userInfo
    );
  }
  // reset password
  resetPass(userdata: any): Observable<any> {
    return this._HttpClient.put(
      environment.baseURl + `/api/v1/auth/resetPassword`,
      userdata
    );
  }
}
