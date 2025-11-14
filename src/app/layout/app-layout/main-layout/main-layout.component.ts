import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { AffiliateService } from '@app/core/service/affiliate-service/affiliate.service';
import { AuthService } from '@app/core/service/authentication-service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@app/layout/header/header.component';
import { SidebarComponent } from '@app/layout/sidebar/sidebar.component';
import { FooterComponent } from '@app/layout/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: [],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainLayoutComponent implements OnInit {
  user: UserAffiliate = new UserAffiliate();
  constructor(
    // private documentCheckService: DocumentCheckService,
    private authService: AuthService,
    private affiliateService: AffiliateService,
    private toast: ToastrService,
  ) {}

  ngOnInit() {
    this.user = this.authService.currentUserAffiliateValue;
    // if (this.user.message_alert == 0) {
    //   this.showAlert();
    // }
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
