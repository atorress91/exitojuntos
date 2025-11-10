import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

import { Response } from '@app/core/models/response-model/response.model';
import { ProductCategory } from '@app/core/models/product-category-model/product-category.model';

const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.inventoryService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.inventoryService;
  }

  getAll() {
    return this.http.get<Response>(this.urlApi.concat('/productCategory'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  createCategory(productCategory: ProductCategory) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/productCategory'),
        productCategory,
        httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateCategory(productCategory: ProductCategory) {
    return this.http
      .put<Response>(
        this.urlApi.concat('/productCategory/', productCategory.id.toString()),
        ProductCategory,
        httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  delete(id: number) {
    return this.http
      .delete<Response>(this.urlApi.concat('/productCategory/', id.toString()), httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
