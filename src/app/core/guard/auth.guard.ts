import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../service/authentication-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Usar signal para verificar si el usuario está logueado
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/signin']);
    return false;
  }
}
