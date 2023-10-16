import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private _HttpClient: HttpClient) {}
  getAllBrand(): Observable<any> {
    return this._HttpClient.get(environment.baseURl + '/api/v1/brands');
  }
  getBrandById(id: string): Observable<any> {
    return this._HttpClient.get(environment.baseURl + '/api/v1/brands/' + id);
  }
}
