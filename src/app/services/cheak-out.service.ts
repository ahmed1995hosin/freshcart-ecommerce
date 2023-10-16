import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheakOutService {
  constructor(private _HttpClient: HttpClient) {}
  // cash order service
  cashOrder(userId: string, value: any): Observable<any> {
    return this._HttpClient.post(
      environment.baseURl + '/api/v1/orders/' + userId,
      {
        shippingAddress: value,
      },
      {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      }
    );
  }
  // online order service
  payOnline(userId: string, value: any, backURL: string): Observable<any> {
    return this._HttpClient.post(
      environment.baseURl +
        '/api/v1/orders/checkout-session/' +
        userId +
        '?url=' +
        backURL,
      {
        shippingAddress: value,
      },
      {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      }
    );
  }
  // get order
  getOrder(id: string): Observable<any> {
    return this._HttpClient.get(
      environment.baseURl + '/api/v1/orders/user/' + id
    );
  }
}
