import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../service/authentication-service/auth.service';

/**
 * Guard para proteger rutas que requieren autenticación
 * Verifica si el usuario está autenticado y si el token es válido
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si hay un usuario logueado
  if (authService.isLoggedIn()) {
    // Verificar si el token es válido
    if (authService.isTokenValid()) {
      return true;
    } else {
      // Token expirado, cerrar sesión y redirigir
      authService.logoutUser();
      router.navigate(['/signin'], {
        queryParams: { returnUrl: state.url, reason: 'token-expired' },
      });
      return false;
    }
  }

  // Usuario no autenticado, redirigir al login
  router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
  return false;
};

/**
 * Guard para proteger rutas de administrador
 * Verifica si el usuario es un administrador
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar autenticación básica
  if (!authService.isLoggedIn() || !authService.isTokenValid()) {
    router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // Verificar si es administrador por el rol
  const currentUser = authService.currentUserAffiliateValue;
  if (
    currentUser?.role?.name?.toLowerCase() === 'admin' ||
    currentUser?.role?.name?.toLowerCase() === 'super_admin'
  ) {
    return true;
  }

  // No es administrador, redirigir a página no autorizada
  router.navigate(['/unauthorized']);
  return false;
};

/**
 * Guard para rutas de afiliados/clientes
 * Verifica si el usuario es un afiliado o cliente
 */
export const affiliateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar autenticación básica
  if (!authService.isLoggedIn() || !authService.isTokenValid()) {
    router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // Verificar si es afiliado (cualquier rol que no sea admin)
  const currentUser = authService.currentUserAffiliateValue;
  const roleName = currentUser?.role?.name?.toLowerCase();
  if (roleName && roleName !== 'admin' && roleName !== 'super_admin') {
    return true;
  }

  // No es afiliado, redirigir a página no autorizada
  router.navigate(['/unauthorized']);
  return false;
};
