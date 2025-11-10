import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

import { Response } from '@app/core/models/response-model/response.model';
import { ProductCombination } from '@app/core/models/product-combination-model/product-combination.model';


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
export class ProductCombinationService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.inventoryService;
  }

  getProductCombinationByProductId(id: number) {
    return this.http
      .get<Response>(this.urlApi.concat('/productCombination/', id.toString()), httpOptions)
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

  createProductCombination(productCombination: ProductCombination) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/productCombination'),
        productCombination,
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
      .delete<Response>(
        this.urlApi.concat('/productCombination/', id.toString()), httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
