import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Response } from '@app/core/models/response-model/response.model';
import { environment } from '@environments/environment';


const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.walletService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};

@Injectable({ providedIn: 'root' })
export class WalletPeriodService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.walletService;
  }

  createWalletPeriod(model: any[]) {
    return this.http
      .post<Response>(this.urlApi.concat('/walletPeriod'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAllWalletsPeriods() {
    return this.http
      .get<Response>(this.urlApi.concat('/walletPeriod/GetAllWalletsPeriods'), httpOptions)
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  delete(id: number) {
    return this.http
      .delete<Response>(this.urlApi.concat('/walletPeriod/', id.toString()), httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
