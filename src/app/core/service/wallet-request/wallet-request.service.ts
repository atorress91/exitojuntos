import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Response } from '@app/core/models/response-model/response.model';
import { environment } from '@environments/environment';
import { WalletRequestRequest } from '@app/core/models/wallet-request-request-model/wallet-request-request.model';
import { WalletRequestRevertTransaction } from '@app/core/models/wallet-request-request-model/wallet-request-revert-transaction.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: environment.tokens.walletService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString(),
  }),
};

@Injectable({ providedIn: 'root' })
export class WalletRequestService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.walletService;
  }

  createWalletRequest(model: WalletRequestRequest) {
    return this.http
      .post<Response>(this.urlApi.concat('/walletRequest'), model, httpOptions)
      .pipe(
        map(response => {
          return response;
        }),
      );
  }

  getAllWallets() {
    return this.http
      .get<Response>(
        this.urlApi.concat('/walletRequest/GetAllWalletsRequests'),
        httpOptions,
      )
      .pipe(
        map(response => {
          return response.data;
        }),
      );
  }

  getWalletRequestByAffiliateId(id: number) {
    return this.http
      .get<Response>(
        this.urlApi.concat('/walletRequest/', id.toString()),
        httpOptions,
      )
      .pipe(
        map(response => {
          return response.data;
        }),
      );
  }

  processOption(option: number, ids: number[]) {
    return this.http
      .post<Response>(
        this.urlApi.concat(
          '/walletRequest/processOption?option=',
          option.toString(),
        ),
        ids,
        httpOptions,
      )
      .pipe(
        map(response => {
          return response;
        }),
      );
  }

  getAllWalletRequestRevertTransaction() {
    return this.http
      .get<Response>(
        this.urlApi.concat(
          '/walletRequest/getAllWalletRequestRevertTransaction',
        ),
        httpOptions,
      )
      .pipe(
        map(response => {
          return response.data;
        }),
      );
  }

  createWalletRequestRevertDebitTransaction(
    model: WalletRequestRevertTransaction,
  ) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/walletRequest/createWalletRequestRevert'),
        model,
        httpOptions,
      )
      .pipe(
        map(response => {
          return response;
        }),
      );
  }

  administrativePayment(ids: number[]) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/walletRequest/administrativePaymentAsync'),
        ids,
        httpOptions,
      )
      .pipe(
        map(response => {
          return response;
        }),
      );
  }
}
