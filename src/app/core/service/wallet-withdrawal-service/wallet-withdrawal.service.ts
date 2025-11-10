import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Response } from '@app/core/models/response-model/response.model';
import { WalletWithDrawal } from '@app/core/models/wallet-withdrawal-model/wallet-withdrawal.model';
import { environment } from '@environments/environment';
const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.walletService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};

@Injectable({ providedIn: 'root' })
export class WalletWithDrawalService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.walletService;
  }

  createWalletWithDrawal(model: WalletWithDrawal) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/walletWithdrawal'),
        model,
        httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAllWalletsWithDrawals() {
    return this.http
      .get<Response>(
        this.urlApi.concat('/walletWithdrawal/GetAllWalletsWithdrawals'), httpOptions
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }
}
