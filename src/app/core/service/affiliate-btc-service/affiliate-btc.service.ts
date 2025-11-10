import { AffiliateBtc } from './../../models/affiliate-btc-model/affiliate-btc.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { Response } from '@app/core/models/response-model/response.model';

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
export class AffiliateBtcService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.accountService;
  }

  createAffiliateBtc(affiliateBtc: AffiliateBtc) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/affiliateBtc'),
        affiliateBtc, httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getAffiliateBtcByAffiliateId(id: number) {
    return this.http
      .get<Response>(
        `${this.urlApi}/affiliateBtc/get_affiliate_btc_by_affiliate_id/${id}`,
        httpOptions
      )
      .pipe(
        map((response) => {
          if (response.success) return response;
          else {
            console.error('ERROR: ' + response);
            return null;
          }
        })
      );
  }
}
