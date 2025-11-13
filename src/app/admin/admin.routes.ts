import { Routes } from '@angular/router';
import { AuthGuardAdmin } from '@app/core/guard/auth.guard.admin';
import { MaintenanceGuard } from '@app/core/guard/maintenance.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home-admin',
    pathMatch: 'full',
  },
  {
    path: 'home-admin',
    loadComponent: () =>
      import('./home/home-admin.component').then(m => m.HomeAdminComponent),
    canActivate: [AuthGuardAdmin, MaintenanceGuard],
  },
];
