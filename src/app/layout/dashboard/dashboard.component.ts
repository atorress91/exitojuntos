import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/core/service/authentication-service/auth.service';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';

import { HomeAdminComponent } from '@app/admin/home/home-admin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, HomeAdminComponent],
})
export class DashboardComponent implements OnInit {
  user: UserAffiliate | null = null;
  roleName: string = '';
  isAdmin = false;
  isClient = false;
  isSuperAdmin = false;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    // Obtener usuario actual
    this.user = this.authService.currentUserAffiliateValue;
    this.roleName = this.user?.role?.name?.toLowerCase() || '';

    // Determinar tipo de usuario
    this.isSuperAdmin = this.roleName === 'super_admin';
    this.isAdmin = this.roleName === 'admin' || this.isSuperAdmin;
    this.isClient = !this.isAdmin;

    console.log('Dashboard cargado para rol:', this.roleName);
  }

  getUserDisplayName(): string {
    return this.user ? `${this.user.name} ${this.user.lastName}` : 'Usuario';
  }

  getRoleDisplayName(): string {
    const roleNames: { [key: string]: string } = {
      super_admin: 'Super Administrador',
      admin: 'Administrador',
      client: 'Cliente',
      affiliate: 'Afiliado',
    };
    return roleNames[this.roleName] || this.roleName;
  }
}
