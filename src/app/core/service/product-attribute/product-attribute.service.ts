import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { Response } from '@app/core/models/response-model/response.model';
import { ProductAttribute } from '@app/core/models/product-attribute-model/product-attribute.model';

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
export class ProductAttributeService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.inventoryService;
  }

  getAll() {
    return this.http
      .get<Response>(this.urlApi.concat('/productAttribute'), httpOptions)
      .pipe(
        map((response) => {
          if (response.success) return response.data;
          else {
            console.error('ERROR: ' + response);
            return null;
          }
        })
      );
  }

  createProductAttribute(productAttribute: ProductAttribute) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/productAttribute'),
        productAttribute,
        httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateProductAttribute(productAttribute: ProductAttribute) {
    return this.http
      .put<Response>(
        this.urlApi.concat('/productAttribute/', productAttribute.id.toString()),
        productAttribute,
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
      .delete<Response>(this.urlApi.concat('/productAttribute/', id.toString()), httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getAttributeType(): Observable<any> {
    return this.http.get('assets/data/admin/product-attributes-data.json');
  }
}
