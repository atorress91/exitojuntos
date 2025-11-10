import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/core/service/authentication-service/auth.service';

/**
 * Componente de ejemplo que muestra cómo usar los signals del AuthService
 *
 * Este componente demuestra:
 * 1. Acceso directo a signals en el template
 * 2. Uso de computed signals para derivar estado
 * 3. Reactividad automática sin suscripciones
 * 4. Sincronización automática entre pestañas
 */
@Component({
  selector: 'app-user-status',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="user-status-container">
      <!-- Mostrar estado de autenticación -->
      @if (authService.isLoggedIn()) {
      <div class="user-info logged-in">
        <h3>✓ Usuario Autenticado</h3>

        <!-- Usuario Afiliado -->
        @if (authService.isAffiliateLoggedIn()) {
        <div class="affiliate-info">
          <p><strong>Tipo:</strong> Afiliado</p>
          <p>
            <strong>Nombre:</strong> {{ authService.userAffiliate()?.name }}
          </p>
          <p>
            <strong>Email:</strong> {{ authService.userAffiliate()?.email }}
          </p>
          <p><strong>ID:</strong> {{ authService.userAffiliate()?.id }}</p>
          <a
            routerLink="/client/dashboard"
            class="btn"
            >Ir al Dashboard</a
          >
        </div>
        }

        <!-- Usuario Admin -->
        @if (authService.isAdminLoggedIn()) {
        <div class="admin-info">
          <p><strong>Tipo:</strong> Administrador</p>
          <p><strong>Nombre:</strong> {{ authService.userAdmin()?.name }}</p>
          <p><strong>Email:</strong> {{ authService.userAdmin()?.email }}</p>
          <p><strong>ID:</strong> {{ authService.userAdmin()?.id }}</p>
          <a
            routerLink="/admin/home"
            class="btn"
            >Ir al Panel de Admin</a
          >
        </div>
        }

        <button
          (click)="logout()"
          class="btn btn-danger"
        >
          Cerrar Sesión
        </button>

        <div class="sync-notice">
          <small
            >💡 Abre otra pestaña para ver la sincronización automática</small
          >
        </div>
      </div>
      } @else {
      <div class="user-info not-logged-in">
        <h3>✗ No Autenticado</h3>
        <p>Por favor, inicia sesión para acceder al sistema.</p>
        <a
          routerLink="/signin"
          class="btn btn-primary"
          >Iniciar Sesión</a
        >
      </div>
      }
    </div>
  `,
  styles: [
    `
      .user-status-container {
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
      }

      .user-info {
        border: 2px solid #ddd;
        border-radius: 8px;
        padding: 20px;
        background: #f9f9f9;
      }

      .user-info.logged-in {
        border-color: #4caf50;
        background: #f1f8f4;
      }

      .user-info.not-logged-in {
        border-color: #ff9800;
        background: #fff8f1;
      }

      h3 {
        margin-top: 0;
        color: #333;
      }

      .affiliate-info,
      .admin-info {
        margin: 15px 0;
        padding: 15px;
        background: white;
        border-radius: 4px;
        border-left: 4px solid #2196f3;
      }

      .admin-info {
        border-left-color: #9c27b0;
      }

      p {
        margin: 8px 0;
      }

      .btn {
        display: inline-block;
        padding: 10px 20px;
        margin: 10px 10px 0 0;
        border: none;
        border-radius: 4px;
        background: #2196f3;
        color: white;
        text-decoration: none;
        cursor: pointer;
        font-size: 14px;
      }

      .btn:hover {
        background: #1976d2;
      }

      .btn-primary {
        background: #4caf50;
      }

      .btn-primary:hover {
        background: #45a049;
      }

      .btn-danger {
        background: #f44336;
      }

      .btn-danger:hover {
        background: #da190b;
      }

      .sync-notice {
        margin-top: 20px;
        padding: 10px;
        background: #fff3cd;
        border: 1px solid #ffc107;
        border-radius: 4px;
        text-align: center;
      }
    `,
  ],
})
export class UserStatusComponent {
  // Inyectar el AuthService usando inject()
  authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    // Effect para reaccionar a cambios de autenticación
    // Esto se ejecutará automáticamente cuando el estado cambie
    effect(() => {
      const isLoggedIn = this.authService.isLoggedIn();
      console.log('Estado de autenticación cambió:', isLoggedIn);

      if (isLoggedIn) {
        if (this.authService.isAffiliateLoggedIn()) {
          console.log(
            'Usuario afiliado detectado:',
            this.authService.userAffiliate()?.name,
          );
        } else if (this.authService.isAdminLoggedIn()) {
          console.log(
            'Usuario admin detectado:',
            this.authService.userAdmin()?.name,
          );
        }
      } else {
        console.log('No hay usuario autenticado');
      }
    });
  }

  logout() {
    this.authService.logoutUser().subscribe(() => {
      console.log('Sesión cerrada');
      this.router.navigate(['/signin']);
    });
  }
}
