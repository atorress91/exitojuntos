import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../service/authentication-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardAdmin  {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.currentUserAdminValue) {
      return true;
    }

    this.router.navigate(['/signin']);
    return false;
  }
}
