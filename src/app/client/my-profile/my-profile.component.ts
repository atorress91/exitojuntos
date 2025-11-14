import { Component, OnInit } from '@angular/core';
import {
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';
import { LoginMovements } from '@app/core/models/signin-model/login-movements.model';

import { AffiliateService } from '@app/core/service/affiliate-service/affiliate.service';
import { AuthService } from '@app/core/service/authentication-service/auth.service';

import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';

import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';

const header = ['Movimientos', 'IP', 'Fecha'];
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    NgbDropdownItem,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
  ],
})
export class MyProfileComponent implements OnInit {
  public user: UserAffiliate = new UserAffiliate();
  public userCookie: UserAffiliate;
  rows = [];
  temp = [];
  loadingIndicator = true;
  reorderable = true;

  constructor(
    private readonly clipboardService: ClipboardService,
    private readonly toastr: ToastrService,
    private readonly authService: AuthService,
    private readonly affiliateService: AffiliateService,
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userCookie = this.authService.currentUserAffiliateValue;
    this.affiliateService
      .getAffiliateById(this.userCookie.id)
      .subscribe(response => {
        if (response.success) {
          this.user = response.data;
          this.loadLoginMovements();
        }
      });
  }

  clipBoardCopy() {
    const string = JSON.stringify(this.temp);
    this.clipboardService.copyFromContent(string);

    if (this.temp.length === 0) {
      this.toastr.info('No data to copy');
    } else {
      this.toastr.success('Copied ' + this.temp.length + ' rows successfully');
    }
  }

  loadLoginMovements() {
    this.authService.getLoginMovementsByAffiliatedId(this.user.id).subscribe({
      next: (response: LoginMovements[]) => {
        console.log(response);
        if (response !== null) {
          this.temp = response;
          this.rows = [...response];
        }
        this.loadingIndicator = false;
      },
      error: error => {
        this.toastr.error('Error loading movements');
        this.loadingIndicator = false;
      },
    });
  }
}
