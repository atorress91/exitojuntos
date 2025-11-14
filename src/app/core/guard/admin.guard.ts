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
    // Verificar si el usuario está logueado y es admin
    if (this.authService.isLoggedIn()) {
      const currentUser = this.authService.currentUserAffiliateValue;
      const roleName = currentUser?.role?.name?.toLowerCase();

      if (roleName === 'admin' || roleName === 'super_admin') {
        return true;
      }
    }

    // Redirigir si no es admin
    this.router.navigate(['/signin']);
    return false;
  }
}
