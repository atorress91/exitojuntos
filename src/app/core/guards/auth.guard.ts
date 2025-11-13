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

  // Verificar si es administrador
  if (authService.isAdminLoggedIn()) {
    const admin = authService.currentUserAdminValue;
    if (admin?.rol_name?.toLowerCase() === 'admin') {
      return true;
    }
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

  // Verificar si es afiliado
  if (authService.isAffiliateLoggedIn()) {
    return true;
  }

  // No es afiliado, redirigir a página no autorizada
  router.navigate(['/unauthorized']);
  return false;
};
