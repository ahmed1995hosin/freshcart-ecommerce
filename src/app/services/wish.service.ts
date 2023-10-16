import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishService {
  constructor(private _HttpClient: HttpClient) {}
  wishList: BehaviorSubject<any> = new BehaviorSubject('');

  addProductWishList(productid: string): Observable<any> {
    return this._HttpClient.post(environment.baseURl + '/api/v1/wishlist', {
      productId: productid,
    });
  }
  removeProductWishList(productid: string): Observable<any> {
    return this._HttpClient.delete(
      environment.baseURl + '/api/v1/wishlist/' + productid
    );
  }

  getWishlist(): Observable<any> {
    return this._HttpClient.get(environment.baseURl + '/api/v1/wishlist');
  }
}
