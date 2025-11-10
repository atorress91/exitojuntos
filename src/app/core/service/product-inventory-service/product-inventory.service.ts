import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

import { Response } from '@app/core/models/response-model/response.model';
import { ProductInventory } from '@app/core/models/product-inventory-model/product-inventory.model';

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
export class ProductInventoryService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.inventoryService;
  }

  getProductsInventoryByProductId(id: number) {
    return this.http
      .get<Response>(this.urlApi.concat('/productInventory/', id.toString()), httpOptions)
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

  createProductInventory(productInventory: ProductInventory) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/productInventory'),
        productInventory,
        httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateProductInventory(productInventory: ProductInventory) {
    return this.http
      .put<Response>(
        this.urlApi.concat(
          '/productInventory/',
          productInventory.id.toString()
        ),
        productInventory,
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
      .delete<Response>(this.urlApi.concat('/productInventory/', id.toString()), httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
