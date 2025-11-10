import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { MatrixConfiguration } from '@app/core/models/matrix-configuration-model/matrix.configuration.model';
import { Response } from '@app/core/models/response-model/response.model';
import { ProductConfiguration } from '@app/core/models/product-configuration-model/product-configuration.model';
import { CompensationPlansConfiguration } from '@app/core/models/compensation-plans-configuration-model/compensation-plans-configuration.model';
import { WalletWithdrawalsConfiguration } from '@app/core/models/wallet-withdrawals-configuration-model/wallet-withdrawals-configuration.model';
import { AdditionalParametersConfiguration } from '@app/core/models/additional-parameters-configuration-model/additional-parameters-configuration.model';
import { GeneralConfiguration } from '@app/core/models/general-configuration/general-configuration.model'

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
export class ConfigurationService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.systemConfigurationService;
  }

  createMatrixConfiguration(matrixConfiguration: MatrixConfiguration) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/configuration/matrix_configuration/'),
        matrixConfiguration, httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getMatrixConfiguration() {
    return this.http
      .get<Response>(
        this.urlApi.concat('/configuration/get_matrix_configuration/'), httpOptions
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

  createProductConfiguration(productConfiguration: ProductConfiguration) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/configuration/product_configuration/'),
        productConfiguration, httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getProductConfiguration() {
    return this.http
      .get<Response>(
        this.urlApi.concat('/configuration/get_product_configuration/'), httpOptions
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

  createCompensationPlansConfiguration(
    compensationPlansConfiguration: CompensationPlansConfiguration
  ) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/configuration/compensation_plans_configuration/'),
        compensationPlansConfiguration, httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getCompensationPlansConfiguration() {
    return this.http
      .get<Response>(
        this.urlApi.concat(
          '/configuration/get_compensation_plans_configuration/'
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

  createWithdrawalsWalletConfiguration(
    walletWithdrawalsConfiguration: WalletWithdrawalsConfiguration
  ) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/configuration/withdrawals_wallet_configuration/'),
        walletWithdrawalsConfiguration, httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getWithdrawalsWalletConfiguration() {
    return this.http
      .get<Response>(
        this.urlApi.concat(
          '/configuration/get_withdrawals_wallet_configuration/'
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

  createAdditionalParametersWalletConfiguration(
    additionalParametersConfiguration: AdditionalParametersConfiguration
  ) {
    return this.http
      .post<Response>(
        this.urlApi.concat(
          '/configuration/additional_parameters_wallet_configuration/'
        ),
        additionalParametersConfiguration, httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getAdditionalParametersWalletConfiguration() {
    return this.http
      .get<Response>(
        this.urlApi.concat(
          '/configuration/get_additional_parameters_wallet_configuration/'
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

  createPassivePackConfiguration(
    additionalParametersConfiguration: AdditionalParametersConfiguration
  ) {
    return this.http
      .post<Response>(
        this.urlApi.concat(
          '/configuration/additional_parameters_wallet_configuration/'
        ),
        additionalParametersConfiguration, httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getPassivePackConfiguration() {
    return this.http
      .get<Response>(
        this.urlApi.concat(
          '/configuration/get_additional_parameters_wallet_configuration/'
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

  checkMaintenance(): Observable<boolean> {
    return this.http.get<Response>(this.urlApi.concat('/configuration/is_under_maintenance'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  setGeneralConfiguration(generalConfiguration: GeneralConfiguration) {
    return this.http.post<Response>(this.urlApi.concat('/configuration/set_general_configuration'), generalConfiguration, httpOptions)
      .pipe(map(data => data));
  }

  getGeneralConfiguration() {
    return this.http.get<Response>(this.urlApi.concat('/configuration/get_general_configuration'), httpOptions)
      .pipe(map(data => data));
  }
}
