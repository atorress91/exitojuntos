import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { environment } from '@environments/environment';
import { Grading } from '@app/core/models/grading-model/grading.model';
import { Response } from '@app/core/models/response-model/response.model';

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
export class GradingService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.systemConfigurationService;
  }

  getAll() {
    return this.http.get<Response>(this.urlApi.concat('/grading'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  getGradingById(id: number) {
    return this.http.get<Response>(`${this.urlApi}/grading/get_grading?id=${id}`, httpOptions).pipe(
      map((response) => {
        if (response.success) return response;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  createGrading(grading: Grading) {
    return this.http
      .post<Response>(this.urlApi.concat('/grading'), grading, httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateGrading(grading: Grading) {
    return this.http
      .put<Response>(
        this.urlApi.concat('/grading/', grading.id.toString()),
        grading,
        httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  delete(id: number) {
    return this.http
      .delete<Response>(this.urlApi.concat('/grading/', id.toString()), httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getProductList(): Observable<any> {
    return this.http.get('assets/data/admin/products-data.json');
  }

  getMembership(): Observable<any> {
    return this.http.get('assets/data/admin/membership-data.json');
  }
}
