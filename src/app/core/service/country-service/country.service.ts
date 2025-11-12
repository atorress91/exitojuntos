import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { Response } from '@app/core/models/response-model/response.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly urlApi: string;
  public readonly http: HttpClient = inject(HttpClient);

  constructor() {
    this.urlApi = environment.apis.exitojuntosService;
  }

  getCountries() {
    return this.http
      .get<Response>(this.urlApi.concat('/countries'), httpOptions)
      .pipe(
        map(response => {
          if (response.success) return response.data;
          else {
            console.error('ERROR: ', response);
            return null;
          }
        }),
      );
  }
}
