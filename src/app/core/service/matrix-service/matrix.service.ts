import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatrixRequest } from './../../interfaces/matrix-request';

import { Response } from '@app/core/models/response-model/response.model';
import { environment } from '@environments/environment';
import { map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.accountService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString(),
  })
};

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = environment.apis.accountService;
  }

  getMatrixByUserId(request: MatrixRequest) {
    return this.http
      .post<Response>(this.urlApi.concat('/matrix/get_matrix_tree'), request, httpOptions)
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
}
