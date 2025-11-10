import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

import { PaymentGroup } from '@app/core/models/payment-group-model/payment.group.model';
import { Response } from '@app/core/models/response-model/response.model';

const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.systemConfigurationService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PaymentGroupsService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.systemConfigurationService;
  }

  getAll() {
    return this.http.get<Response>(this.urlApi.concat('/groups'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  createPaymentGroup(paymentGroup: PaymentGroup) {
    return this.http
      .post<Response>(this.urlApi.concat('/groups'), paymentGroup, httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updatePaymentGroup(paymentGroup: PaymentGroup) {
    return this.http
      .put<Response>(
        this.urlApi.concat('/groups/', paymentGroup.id.toString()),
        paymentGroup,
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
      .delete<Response>(this.urlApi.concat('/groups/', id.toString()), httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
