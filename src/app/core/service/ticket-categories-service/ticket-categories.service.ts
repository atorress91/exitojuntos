import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '@environments/environment';
import { Response } from '@app/core/models/response-model/response.model';


const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.accountService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};
@Injectable({
  providedIn: 'root'
})
export class TicketCategoriesService {
  urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = environment.apis.accountService;
  }

  getAll() {
    return this.http.get<Response>(this.urlApi.concat('/ticketCategories/get_all'), httpOptions).pipe(
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
