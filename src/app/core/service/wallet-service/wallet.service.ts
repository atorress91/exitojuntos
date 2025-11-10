import {CreditTransactionAdminRequest} from '@app/core/models/wallet-model/creditTransactionAdminRequest.mode';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

import {Response} from '@app/core/models/response-model/response.model';
import {environment} from '@environments/environment';
import {Wallet} from '@app/core/models/wallet-model/wallet.model';
import {TransferBalance} from '@app/core/models/wallet-model/transfer-balance.model'
import {WalletRequest} from '@app/core/models/wallet-model/wallet-request.model';

const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.walletService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};

@Injectable({providedIn: 'root'})
export class WalletService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = environment.apis.walletService;
  }

  createWallet(model: Wallet) {
    return this.http
      .post<Response>(this.urlApi.concat('/wallet'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getBalanceInformationAdmin() {
    return this.http
      .get<Response>(this.urlApi.concat('/wallet/GetBalanceInformationAdmin'), httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAllWallets() {
    return this.http
      .get<Response>(this.urlApi.concat('/wallet/GetAllWallets'), httpOptions)
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  getWalletByAffiliateId(id: number) {
    return this.http
      .get<Response>(
        this.urlApi.concat('/wallet/GetWalletByAffiliateId/', id.toString()), httpOptions
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  getBalanceInformationByAffiliateId(id: number) {
    return this.http
      .get<Response>(
        this.urlApi.concat(
          '/wallet/GetBalanceInformationByAffiliateId/',
          id.toString()
        ), httpOptions
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  getStatisticsInformationByAffiliateId(id: number) {
    return this.http
      .get<Response>(
        `${this.urlApi}/userStatistics/${id}`, httpOptions
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  payWithMyBalance(model: WalletRequest) {
    return this.http
      .post<Response>(this.urlApi.concat('/wallet/payWithMyBalance'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  payWithMyBalanceForOthers(model: WalletRequest) {
    return this.http
      .post<Response>(this.urlApi.concat('/wallet/payWithMyBalanceForOthers'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  payWithMyBalanceModel2(model: WalletRequest) {
    return this.http
      .post<Response>(this.urlApi.concat('/wallet/payWithMyBalanceModel2'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  payMembershipWithMyBalance(model: WalletRequest) {
    return this.http
      .post<Response>(this.urlApi.concat('/wallet/payMembershipWithMyBalance'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  payWithMyBalanceAdmin(model: WalletRequest) {
    return this.http
      .post<Response>(this.urlApi.concat('/wallet/payWithMyBalanceAdmin'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  payWithMyBalanceCourses(model: WalletRequest) {
    return this.http
      .post<Response>(this.urlApi.concat('/wallet/payWithMyBalanceCourses'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  transferBalanceForMembership(model: TransferBalance) {
    return this.http
      .post<Response>(this.urlApi.concat('/wallet/transferBalanceForNewAffiliates'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  transferBalance(model: string) {
    return this.http
      .post<Response>(this.urlApi.concat('/wallet/transferBalance'), JSON.stringify(model), httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  rejectOrCancelRevertDebitTransaction(option: number, id: number) {
    return this.http
      .post<Response>(this.urlApi.concat('/wallet/rejectOrCancelRevertDebitTransaction?option=', option.toString()), id, httpOptions)
      .pipe(
        map((response) => {

          return response;
        })
      );
  }

  getPurchasesInMyNetwork(id: number) {
    return this.http
      .get<Response>(
        this.urlApi.concat('/wallet/getPurchasesMadeInMyNetwork/', id.toString()), httpOptions
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  createBalanceAdmin(model: CreditTransactionAdminRequest) {
    return this.http
      .post<Response>(this.urlApi.concat('/wallet/createCreditAdmin'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
