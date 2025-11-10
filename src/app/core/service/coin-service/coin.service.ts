import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CoinService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = 'https://api.coincap.io/v2/assets/bitcoin';
  }

  getCoin(): Observable<any> {
    return this.http.get<any>(this.urlApi).pipe(
      map((response) => {
        if (response.data) {
          return response.data;
        } else {
          console.error('ERROR: Invalid response');
          return null;
        }
      })
    );
  }
}
