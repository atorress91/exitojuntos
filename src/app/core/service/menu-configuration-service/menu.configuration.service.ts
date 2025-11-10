import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Response } from '@app/core/models/response-model/response.model';

const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.accountService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};
@Injectable({ providedIn: 'root' })
export class MenuConfigurationService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.accountService;
  }

  getAll() {
    return this.http
      .get<Response>(this.urlApi.concat('/MenuConfiguration/get_all'), httpOptions)
      .pipe(
        map((response) => {
          if (response.success)
            return response.data;
          else {
            console.error('ERROR: ' + response);
            return null;
          }
        })
      );
  }
}
