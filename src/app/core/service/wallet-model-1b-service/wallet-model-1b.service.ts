import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

import { Response } from '@app/core/models/response-model/response.model';
import { map } from 'rxjs';
import { WalletRequest } from '@app/core/models/wallet-model/wallet-request.model';
import { CreditTransactionAdminRequest } from '@app/core/models/wallet-model/creditTransactionAdminRequest.mode';
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
export class WalletModel1BService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.walletService;
  }

  getBalanceInformationByAffiliateId(id: number) {
    return this.http
      .get<Response>(
        this.urlApi.concat(
          '/walletModel1B/GetBalanceInformationByAffiliateId/',
          id.toString()
        ), httpOptions
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  payWithMyBalance(model: WalletRequest) {
    return this.http
      .post<Response>(this.urlApi.concat('/walletModel1B/payWithMyBalance1B'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  payWithMyServiceBalance(model: WalletRequest) {
    return this.http
      .post<Response>(this.urlApi.concat('/walletModel1B/payWithMyServiceBalance'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      )
  }

  createServiceBalanceAdmin(model: CreditTransactionAdminRequest) {
    return this.http
      .post<Response>(this.urlApi.concat('/walletModel1B/CreateServiceBalanceAdmin'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
