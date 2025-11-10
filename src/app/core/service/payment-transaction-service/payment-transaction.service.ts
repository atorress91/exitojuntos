
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { environment } from '@environments/environment';
import { PaymentTransaction } from '@app/core/models/payment-transaction-model/payment-transaction-request.model';
import { Response } from '@app/core/models/response-model/response.model';
import { ConfirmPaymentTransaction } from '@app/core/models/payment-transaction-model/confirm-payment-transaction';
const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.walletService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};
@Injectable({
  providedIn: 'root'
})
export class PaymentTransactionService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.walletService;
  }

  createPaymentTransaction(transaction: PaymentTransaction) {
    return this.http
      .post<Response>(this.urlApi.concat('/PaymentTransaction'), transaction, httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getAllWireTransactions() {
    return this.http
      .get<Response>(this.urlApi.concat('/PaymentTransaction/getAllWireTransfer'), httpOptions)
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  confirmPayment(transaction: ConfirmPaymentTransaction) {
    return this.http
      .post<Response>(this.urlApi.concat('/PaymentTransaction/confirmPayment'), transaction, httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
