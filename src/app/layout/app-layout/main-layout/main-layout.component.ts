import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
} from '@angular/core';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { AffiliateService } from '@app/core/service/affiliate-service/affiliate.service';
import { AuthService } from '@app/core/service/authentication-service/auth.service';
import { MembershipManagerService } from '@app/core/service/membership-manager-service/membership-manager.service';
import { TermsConditionsService } from '@app/core/service/terms-conditions-service/terms-conditions.service';
import { TicketHubService } from '@app/core/service/ticket-service/ticket-hub.service';
import { ToastrService } from 'ngx-toastr';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@app/layout/header/header.component';
import { SidebarComponent } from '@app/layout/sidebar/sidebar.component';
import { RightSidebarComponent } from '@app/layout/right-sidebar/right-sidebar.component';
import { FooterComponent } from '@app/layout/footer/footer.component';
import { TermsConditionsModalComponent } from '@app/layout/terms-conditions-modal/terms-conditions-modal.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: [],
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    FooterComponent,
    TermsConditionsModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainLayoutComponent implements OnInit, AfterViewInit {
  user: UserAffiliate = new UserAffiliate();
  constructor(
    // private documentCheckService: DocumentCheckService,
    private readonly termsConditionsService: TermsConditionsService,
    private readonly authService: AuthService,
    private readonly membershipManagerService: MembershipManagerService,
    private readonly affiliateService: AffiliateService,
    private readonly toast: ToastrService,
    private readonly ticketHubService: TicketHubService,
  ) {}

  ngOnInit() {
    this.user = this.authService.currentUserAffiliateValue;
  }

  ngAfterViewInit(): void {
    if (this.user.createdAt == null) {
      this.showMembershipManager();
    }
  }

  showMembershipManager() {
    this.membershipManagerService.show();
  }

  showTermsConditionsModal() {
    this.termsConditionsService.show();
  }

  messageReceived() {
    this.affiliateService.updateMessageAlert(this.user.id).subscribe({
      next: value => {
        this.showSuccess('Mensaje recibido correctamente');
        this.authService.setUserAffiliateValue(this.user);
      },
      error: err => {
        this.showError('Error');
      },
    });
  }

  showSuccess(message: string) {
    this.toast.success(message);
  }

  showError(message: string) {
    this.toast.error(message);
  }
}
