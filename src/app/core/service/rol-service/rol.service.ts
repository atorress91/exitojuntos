import { Injectable, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Rol } from '@app/core/models/rol-model/rol.model';
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
export class RolService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.accountService;
  }

  getAll() {
    return this.http.get<Response>(this.urlApi.concat('/role/get_all'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  getRol() {
    return this.http.get<Response>(this.urlApi.concat('/role/get_rol'), httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }

  updateRol(model: Rol) {
    return this.http
      .put<Response>(
        this.urlApi.concat('/role/', model.id.toString()),
        model,
        httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteRol(id: number) {
    return this.http
      .delete<Response>(this.urlApi.concat('/role/', id.toString()), httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  createRol(model: Rol) {
    return this.http
      .post<Response>(this.urlApi.concat('/role'), model, httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
