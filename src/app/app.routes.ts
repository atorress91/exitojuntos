import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthGuardAdmin } from './core/guard/auth.guard.admin';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/app-layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/welcome', pathMatch: 'full' },
      {
        path: 'app',
        loadChildren: () =>
          import('./client/client.routes').then((m) => m.CLIENT_ROUTES),
      }
    ],
  },
  {
    path: '',
    loadComponent: () => import('./layout/app-layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [AuthGuardAdmin],
    children: [
      { path: '', redirectTo: '/welcome', pathMatch: 'full' },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
      }
    ],
  },
  {
    path: '',
    loadComponent: () => import('./layout/app-layout/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    loadChildren: () =>
      import('./authentication/authentication.routes').then(
        (m) => m.AUTHENTICATION_ROUTES
      ),
  }
];

