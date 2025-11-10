import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { ConceptLevel } from '@app/core/models/concept-configuration-model/concept-level.model';
import { Response } from '@app/core/models/response-model/response.model';
import { environment } from '@environments/environment';

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
export class ConceptConfigurationService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.systemConfigurationService;
  }

  getConceptConfigurationByConceptId(id: number) {
    return this.http
      .get<Response>(
        this.urlApi.concat(
          '/conceptConfiguration/get_all_concept_configuration?id=',
          id.toString()
        ), httpOptions
      )
      .pipe(
        map((response) => {
          if (response.success) return response.data;
          else {
            console.error('ERROR: ' + response);
            return null;
          }
        })
      );
  }

  createConceptLevel(conceptLevel: ConceptLevel) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/conceptConfiguration'),
        conceptLevel,
        httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateConceptLevel(conceptLevel: ConceptLevel) {
    return this.http
      .put<Response>(
        this.urlApi.concat(
          '/conceptConfiguration/',
          conceptLevel.id.toString()
        ),
        conceptLevel,
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
      .delete<Response>(
        this.urlApi.concat('/conceptConfiguration/', id.toString()), httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
