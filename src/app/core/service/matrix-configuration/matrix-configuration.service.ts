import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { Response } from '@app/core/models/response-model/response.model';
import { environment } from '@environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.systemConfigurationService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString(),
  })
};

@Injectable({
  providedIn: 'root'
})
export class MatrixConfigurationService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = environment.apis.systemConfigurationService;
  }

  getAllMatrixConfigurations() {
    return this.http
      .get<Response>(this.urlApi.concat('/matrixConfiguration/get_all_matrix_configurations'), httpOptions
      )
      .pipe(
        map((response) => {
          if (response.success) return response.data;
          else {
            console.error('ERROR: ' + response);
            return null;
          }
        })
      )
  }
}
