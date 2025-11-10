import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { map } from 'rxjs';

import { Response } from '@app/core/models/response-model/response.model';
import { Incentive } from '@app/core/models/incentive-model/incentive.model';

const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.systemConfigurationService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};
@Injectable({
  providedIn: 'root',
})
export class IncentiveService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.systemConfigurationService;
  }

  getAll() {
    return this.http.get<Response>(this.urlApi.concat('/incentives'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  createGrading(incentive: Incentive) {
    return this.http
      .post<Response>(this.urlApi.concat('/incentives'), incentive, httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  delete(id: number) {
    return this.http
      .delete<Response>(this.urlApi.concat('/incentives/', id.toString()), httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateIncentive(incentive: Incentive) {
    return this.http
      .put<Response>(
        this.urlApi.concat('/incentives/', incentive.id.toString()),
        incentive,
        httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
