import { environment } from '@environments/environment';
import { PassivePack } from './../../models/passive-pack-model/passive-pack.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { Response } from '@app/core/models/response-model/response.model';
import { EcoPoolConfiguration } from '@app/core/models/ecopool-configuration-model/ecopool.configuration.model';
import { BehaviorSubject, Subject, interval } from 'rxjs';

const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.walletService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};

@Injectable({ providedIn: 'root' })
export class ProcessGradingService {
  private progressSource = new BehaviorSubject<number>(0);
  private stop$ = new Subject<void>();
  private urlApi: string;
  progress$ = this.progressSource.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.walletService;
  }

  execEcoPoolProcess() {
    return this.http
      .post<Response>(`${this.urlApi}/processGrading/eco_pool_process`, {}, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );

  }

  createEcoPoolConfiguration(model: PassivePack) {
    return this.http
      .post<Response>(this.urlApi.concat('/processGrading/eco_pool_configuration'), model, httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getEcoPoolConfiguration() {
    return this.http
      .get<EcoPoolConfiguration>(
        this.urlApi.concat(
          '/processGrading',
        ), httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getProgressPercentage(configurationId) {
    return this.http
      .get<Response>(`${this.urlApi}/processGrading/GetProgressPercentage/${configurationId}`, httpOptions)
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  startFetchingProgress(configurationId): void {
    interval(2000).pipe(
      takeUntil(this.stop$),
      switchMap(() => this.getProgressPercentage(configurationId))
    ).subscribe(
      progress => {
        this.progressSource.next(progress);
      },
      error => console.error(error)
    );
  }

  stopFetchingProgress(): void {
    this.stop$.next();
  }
}
