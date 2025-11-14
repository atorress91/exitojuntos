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
export class AuthGuardAdmin {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserAffiliateValue;
    const roleName = currentUser?.role?.name?.toLowerCase();

    if (currentUser && (roleName === 'admin' || roleName === 'super_admin')) {
      return true;
    }

    this.router.navigate(['/signin']);
    return false;
  }
}
