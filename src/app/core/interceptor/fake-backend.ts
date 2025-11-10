// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpResponse,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HTTP_INTERCEPTORS,
// } from '@angular/common/http';
// import { Observable, of, throwError } from 'rxjs';
// import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
// import { User } from '../models/user-model/user.model';

// const users: User[] = [
//   {
//     id: 1,
//     rol_id: 1,
//     rol_name:'Administracion',
//     user_name: 'jefferson.delgado',
//     name: 'Jeff',
//     password: 'admin@123',
//     address: '',
//     phone: '86253523',
//     last_name: 'Delgado',
//     observation: '',
//     email: 'example@host.com',
//     status: true,
//     created_at: new Date(),
//     updated_at: new Date(),
//     token: 'admin-token'
//   }
// ];

// @Injectable()
// export class FakeBackendInterceptor implements HttpInterceptor {
//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const { url, method, headers, body } = request;
//     // wrap in delayed observable to simulate server api call
//     return of(null).pipe(mergeMap(handleRoute));

//     function handleRoute() {
//       switch (true) {
//         case url.endsWith('/authenticate') && method === 'POST':
//           return authenticate();
//         default:
//           // pass through any requests not handled above
//           return next.handle(request);
//       }
//     }

//     // route functions

//     function authenticate() {
//       const { email, password } = body;
//       const user = users.find(
//         (x) => x.email === email && x.password == password
//       );
//       if (!user) {
//         return error('Username or password is incorrect');
//       }
//       return ok(user);
//     }

//     // helper functions

//     function ok(body?) {
//       return of(new HttpResponse({ status: 200, body }));
//     }

//     function error(message) {
//       return throwError({ error: { message } });
//     }

//     function unauthorized() {
//       return throwError({ status: 401, error: { message: 'Unauthorised' } });
//     }

//     function isLoggedIn() {
//       return headers.get('Authorization') === 'Bearer fake-jwt-token';
//     }
//   }
// }

// export let fakeBackendProvider = {
//   // use fake backend in place of Http service for backend-less development
//   provide: HTTP_INTERCEPTORS,
//   useClass: FakeBackendInterceptor,
//   multi: true,
// };
