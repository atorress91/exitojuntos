import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/core/service/authentication-service/auth.service';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';

// Shared components
import { RightSidebarComponent } from '@app/layout/right-sidebar/right-sidebar.component';
import { FooterComponent } from '@app/layout/footer/footer.component';

@Component({
  selector: 'app-unified-layout',
  templateUrl: './unified-layout.component.html',
  styleUrls: ['./unified-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RightSidebarComponent, FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UnifiedLayoutComponent implements OnInit {
  user: UserAffiliate | null = null;
  isAdmin = false;
  isClient = false;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserAffiliateValue;
    const roleName = this.user?.role?.name?.toLowerCase();

    this.isAdmin = roleName === 'admin' || roleName === 'super_admin';
    this.isClient = !this.isAdmin;
  }
}
