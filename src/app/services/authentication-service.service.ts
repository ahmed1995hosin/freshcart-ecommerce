import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnInit {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}
  ngOnInit(): void {}

  // userToken
  userToken: BehaviorSubject<any> = new BehaviorSubject(null);
  userinfo: BehaviorSubject<any> = new BehaviorSubject(null);
  // local storage
  getLocal(): void {
    this.userToken.next(localStorage.getItem('token'));
    if (localStorage.getItem('userinfo')) {
      //
      let userino = JSON.parse(localStorage.getItem('userinfo') || '');
      this.userinfo.next(userino);
    }
  }

  // console.log(localStorage.getItem('userToken'));

  // function getUser data
  getUser(): void {}

  // behaviorSubject is same as the observable but it for properties to subscribe to    it
  // register
  register(registerData: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      registerData
    );
  }
  // login
  login(logInData: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      logInData
    );
  }
  // logOut method
  logOut(): void {
    this.userToken.next(null);
    this._Router.navigate(['/login']);
  }
}
