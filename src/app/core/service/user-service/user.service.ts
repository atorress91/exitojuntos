import { UpdatePassword } from '@app/core/models/user-model/update.password.model';
import { Signin } from '@app/core/models/signin-model/signin.model';
import { Injectable, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '@app/core/models/user-model/user.model';
import { environment } from '@environments/environment';
import { Response } from '@app/core/models/response-model/response.model';
import { UpdateImageProfile } from '@app/core/models/user-affiliate-model/update-image-profile.model';

const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.accountService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};

@Injectable({ providedIn: 'root' })
export class UserService {
  private urlApi: string;

  constructor(private router: Router, private http: HttpClient) {
    this.urlApi = environment.apis.accountService;
  }

  getAll() {
    return this.http.get<Response>(this.urlApi.concat('/user/get_all'), httpOptions).pipe(
      map((response) => {
        if (response.success) return response.data;
        else {
          console.error('ERROR: ' + response);
          return null;
        }
      })
    );
  }

  getUsersByRolId(user: User) {
    return this.http
      .get<Response>(
        this.urlApi.concat(
          '/user/get_users_rol_id?id=',
          user.rol_id.toString()
        ),
        httpOptions
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

  getUser(user: User) {
    return this.http
      .get<Response>(
        this.urlApi.concat('/user/get_user?id=', user.id.toString()), httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  updatePassword(user: UpdatePassword) {
    return this.http
      .put<Response>(
        this.urlApi.concat('/user/update_password_user/', user.id.toString()),
        user, httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateUser(user: User) {
    return this.http
      .put<Response>(this.urlApi.concat('/user/', user.id.toString()), user, httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteUser(id: number) {
    return this.http
      .delete<Response>(this.urlApi.concat('/user/', id.toString()), httpOptions)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  createUser(user: User) {
    return this.http.post<Response>(this.urlApi.concat('/user'), user, httpOptions).pipe(
      map((data) => {
        return data;
      })
    );
  }

  updateImageProfile(id: number, imgProfile: UpdateImageProfile) {
    return this.http
      .put<Response>(
        `${this.urlApi}/user/update_image_profile_url/${id}`,
        imgProfile,
        httpOptions
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
}
