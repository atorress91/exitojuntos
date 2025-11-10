import { Injectable, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Privilege } from '@app/core/models/privilege-model/privilege.model';
import { Response } from '@app/core/models/response-model/response.model';
import { environment } from '@environments/environment';

const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.accountService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};
@Injectable({ providedIn: 'root' })
export class PrivilegeService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.accountService;
  }

  updatePrivilege(model: Privilege) {
    return this.http
      .put<Response>(
        this.urlApi.concat('/privilege/', model.id.toString()),
        model,
        httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  createPrivilege(model: Privilege) {
    return this.http
      .post<Response>(this.urlApi.concat('/privilege'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getMenuConfigurations(rolId: number) {
    return this.http
      .get<Response>(
        this.urlApi.concat(
          '/privilege/get_privilege_rol_id?rolId=',
          rolId.toString()
        ), httpOptions
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  getAllPrivileges() {
    return this.http
      .get<Response>(this.urlApi.concat('/privilege/get_all'), httpOptions)
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }
}
