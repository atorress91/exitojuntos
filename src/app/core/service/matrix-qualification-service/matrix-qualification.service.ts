import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Response } from '@app/core/models/response-model/response.model';
import { MatrixRequest } from './../../interfaces/matrix-request';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: environment.tokens.walletService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString(),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MatrixQualificationService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apis.walletService;
  }

  processQualificationAdmin(request: MatrixRequest): Observable<any> {
    return this.http
      .post<Response>(
        `${this.apiUrl}/matrixQualification/process_qualification_admin`,
        request,
        httpOptions,
      )
      .pipe(
        map(response => {
          if (response.success) {
            return response.data;
          } else {
            console.error('Error en processQualificationAdmin: ', response);
            return null;
          }
        }),
      );
  }

  processDirectPaymentMatrixActivation(
    request: MatrixRequest,
  ): Observable<any> {
    return this.http
      .post<Response>(
        `${this.apiUrl}/matrixQualification/process_direct_payment_matrix_activation_async`,
        request,
        httpOptions,
      )
      .pipe(
        map(response => {
          if (response.success) {
            return response.data;
          } else {
            console.error(
              'Error in processDirectPaymentMatrixActivation: ',
              response,
            );
            return null;
          }
        }),
      );
  }

  hasReachedWithdrawalLimit(userId: number) {
    return this.http
      .get<Response>(
        `${this.apiUrl}/matrixQualification/has-reached-withdrawal-limit?userId=${userId}`,
        httpOptions,
      )
      .pipe(
        map(response => {
          return response;
        }),
      );
  }
}
