import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

import { Response } from '@app/core/models/response-model/response.model';
import { Product } from '@app/core/models/product-model/product.model';
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
export class ProductService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.inventoryService;
  }

  getAllEcoPooles() {
    return this.http.get<Response>(this.urlApi.concat('/product'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  getAllServices() {
    return this.http.get<Response>(this.urlApi.concat('/product/get_all_services'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  getAllProductsAdmin() {
    return this.http.get<Response>(this.urlApi.concat('/product/getAllProductsAdmin'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  getAllMembership() {
    return this.http.get<Response>(this.urlApi.concat('/product/membership'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  createProduct(product: Product) {
    return this.http
      .post<Response>(this.urlApi.concat('/product'), product, httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateProduct(product: Product) {
    return this.http
      .put<Response>(
        this.urlApi.concat('/product/', product.id.toString()),
        product,
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
      .delete<Response>(this.urlApi.concat('/product/', id.toString()), httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getAllFundingAccounts() {
    return this.http.get<Response>(this.urlApi.concat('/product/get_all_funding_accounts'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  getAllTradingAcademy() {
    return this.http.get<Response>(this.urlApi.concat('/product/get_all_trading_academy'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  getAllSavingsPlans() {
    return this.http.get<Response>(this.urlApi.concat('/product/get_all_savings_plans'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  getAllSavingsPlansOneB() {
    return this.http.get<Response>(this.urlApi.concat('/product/get_all_savings_plans_one_b'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  getAllAlternativeHealth() {
    return this.http.get<Response>(this.urlApi.concat('/product/get_all_alternative_health'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR' + response);
          return null;
        }
      })
    )
  }

  getAllAlternativeHealthForEurope() {
    return this.http.get<Response>(this.urlApi.concat('/product/get_all_alternative_health_for_europe'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR' + response);
          return null;
        }
      })
    )
  }

  getAllexitojuntos() {
    return this.http.get<Response>(this.urlApi.concat('/product/get_all_exitojuntos'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR' + response);
          return null;
        }
      })
    )
  }
}
