import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CoinPayWithdrawal } from '@app/core/models/coinpay-model/coinpay-withdrawal.model';
import { environment } from '@environments/environment';
import { RequestPayment } from '@app/core/models/coinpay-model/request-payment.model';
import { Response } from '@app/core/models/response-model/response.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': environment.tokens.walletService.toString(), 'X-Client-ID': environment.tokens.clientID.toString() }),
};

@Injectable({
  providedIn: 'root'
})
export class CoinpayService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.walletService;
  }

  createCoinPayTransaction(requestPayment: RequestPayment) {
    return this.http
      .post(this.urlApi.concat('/coinpay/createTransaction'), requestPayment, httpOptions);
  }

  createChannel(request: RequestPayment) {
    return this.http
      .post<Response>(this.urlApi.concat('/coinpay/createChannel'), request, httpOptions)
      .pipe(
        map((response) => {
          console.log('response', response);
          return response;
        }));
  }

  sendFunds(withdrawalRequest: CoinPayWithdrawal[]): Observable<Response> {
    return this.http.post<Response>(this.urlApi.concat('/coinpay/sendFunds'), withdrawalRequest, httpOptions)
      .pipe(map(data => data));
  }

  getTransactionByReference(reference: string): Observable<Response> {
    const params = new HttpParams().set('reference', reference);
    return this.http.get<Response>(this.urlApi.concat('/coinpay/getTransactionByReference'), { params, ...httpOptions })
      .pipe(map(data => data));
  }

  getNetworks(idCurrency: number) {
    return this.http
      .get<Response>(
        this.urlApi.concat(`/coinpay/getNetworksByIdCurrency?idCurrency=${idCurrency}`),
        httpOptions
      )
      .pipe(
        map((response) => {
          console.log(response);
          if (response) return response.data;
          else {
            console.error('ERROR: ' + response);
            return null;
          }
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
