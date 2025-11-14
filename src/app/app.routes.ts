import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Layout unificado para usuarios autenticados (admin y cliente)
  {
    path: '',
    loadComponent: () =>
      import(
        './layout/app-layout/unified-layout/unified-layout.component'
      ).then(m => m.UnifiedLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      // Dashboard unificado (se creará)
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./layout/dashboard/dashboard.component').then(
            m => m.DashboardComponent,
          ),
      },
      // Rutas de cliente
      {
        path: 'app',
        loadChildren: () =>
          import('./client/client.routes').then(m => m.CLIENT_ROUTES),
      },
      // Rutas de admin
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
      },
    ],
  },
  // Layout de autenticación (login, registro, etc.)
  {
    path: '',
    loadComponent: () =>
      import('./layout/app-layout/auth-layout/auth-layout.component').then(
        m => m.AuthLayoutComponent,
      ),
    loadChildren: () =>
      import('./authentication/authentication.routes').then(
        m => m.AUTHENTICATION_ROUTES,
      ),
  },
];
