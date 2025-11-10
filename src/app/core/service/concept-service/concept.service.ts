import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

import { Response } from '@app/core/models/response-model/response.model';
import { ConceptList } from '@app/core/models/concept-model/concept-list.model';
import { Observable } from 'rxjs';

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
export class ConceptService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.systemConfigurationService;
  }

  getAll() {
    return this.http.get<Response>(this.urlApi.concat('/concept')).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  getCalculateConceptList(): Observable<any> {
    return this.http.get('assets/data/admin/calculate-concept-data.json');
  }

  getPayConceptList(): Observable<any> {
    return this.http.get('assets/data/admin/pay-concept-data.json');
  }

  createConcept(concept: ConceptList) {
    return this.http
      .post<Response>(this.urlApi.concat('/concept'), concept, httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateConcept(concept: ConceptList) {
    return this.http
      .put<Response>(
        this.urlApi.concat('/concept/', concept.id.toString()),
        concept,
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
      .delete<Response>(this.urlApi.concat('/concept/', id.toString()), httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
