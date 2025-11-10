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
export class AdminGuard {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Usar signal para verificar si el usuario admin está logueado
    if (this.authService.isAdminLoggedIn()) {
      return true;
    }

    // Redirigir si no es admin
    this.router.navigate(['/signin']);
    return false;
  }
}
