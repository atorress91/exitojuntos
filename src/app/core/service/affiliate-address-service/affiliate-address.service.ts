import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Response } from '@app/core/models/response-model/response.model';
import { environment } from '@environments/environment';
import { catchError, map, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: environment.tokens.accountService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AffiliateAddressService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.accountService;
  }


  getAffiliateAddressByAffiliateId(id: number) {
    return this.http
      .get<Response>(
        `${this.urlApi}/affiliateAddress/getAffiliateAddressByAffiliateId/${id}`,
        httpOptions
      )
      .pipe(
        map((response) => {
          if (response.success) return response;
          else {
            console.error('ERROR: ' + response);
            return null;
          }
        }),
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }
}
