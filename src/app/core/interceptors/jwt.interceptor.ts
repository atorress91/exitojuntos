import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../service/authentication-service/auth.service';
import { JWT_CONFIG } from '../config/jwt.config';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // Verificar si la URL está en la lista blanca (no requiere autenticación)
    const isWhiteListed = JWT_CONFIG.WHITE_LIST.some(url =>
      request.url.includes(url),
    );

    // Si la ruta está en la lista blanca, continuar sin agregar token
    if (isWhiteListed) {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
      );
    }

    // Obtener el token del usuario actual (afiliado o admin)
    const currentUserAffiliate = this.authService.currentUserAffiliateValue;
    const currentUserAdmin = this.authService.currentUserAdminValue;

    const token =
      currentUserAffiliate?.access_token || currentUserAdmin?.access_token;

    // Si existe un token, agregarlo al header Authorization
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${JWT_CONFIG.HEADER_PREFIX} ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el error es 401 (No autorizado), redirigir al login
        if (error.status === 401) {
          this.authService.logoutUser();
          this.router.navigate(['/signin']);
        }

        return throwError(() => error);
      }),
    );
  }
}
