import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
environment;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productCounts: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private _HttpClient: HttpClient) {}

  addProductToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseURl}/api/v1/cart`, {
      productId: productId,
    });
  }
  // get products in the cart
  getProductsInCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURl}/api/v1/cart`);
  }
  // delete  product by id
  deleteProductById(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseURl}/api/v1/cart/${productId}`
    );
  }
  clearUserCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURl}/api/v1/cart`);
    // https://ecommerce.routemisr.com/api/v1/cart
  }
  // updata product in cart
  updataProductCount(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseURl}/api/v1/cart/${productId}`,
      { count: count }
    );
  }
}
