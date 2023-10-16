import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categoryId: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private _HttpClient: HttpClient) {}
  // get all categories
  getAllCategories(): Observable<any> {
    return this._HttpClient.get(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
  }
  // Get All SubCategories On Category
  getAllSubCategoriesOnCategory(category: string): Observable<any> {
    return this._HttpClient.get(
      environment.baseURl + `/api/v1/categories/${category}/subcategories`
    );
  }
  // Get specific category
  getSpecificCategory(id: string): Observable<any> {
    return this._HttpClient.get(
      environment.baseURl + `/api/v1/categories/` + id
    );
  }
}
