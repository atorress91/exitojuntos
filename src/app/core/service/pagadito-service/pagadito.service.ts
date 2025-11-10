import { CreatePagaditoTransactionRequest } from '@app/core/models/pagadito-model/create-pagadito-transaction-request.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { Response } from '@app/core/models/response-model/response.model';
import { map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.walletService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  })
}

@Injectable({
  providedIn: 'root'
})
export class PagaditoService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.walletService;
  }

  createTransaction(request: CreatePagaditoTransactionRequest) {
    return this.http
      .post<Response>(this.urlApi.concat('/Pagadito/create_transaction'), request, httpOptions)
      .pipe(
        map((response) => {
          return response;
        }));
  }
}
