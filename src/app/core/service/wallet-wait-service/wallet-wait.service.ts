import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Response } from '@app/core/models/response-model/response.model';
import { environment } from '@environments/environment';
import { WalletWait } from '@app/core/models/wallet-wait-model/wallet-wait.model';

const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.walletService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};

@Injectable({ providedIn: 'root' })
export class WalletWaitService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.walletService;
  }

  createWalletWait(model: WalletWait) {
    return this.http
      .post<Response>(this.urlApi.concat('/walletWait'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAllWalletsWait() {
    return this.http
      .get<Response>(this.urlApi.concat('/walletWait/GetAllWalletsWaits'), httpOptions)
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }
}
