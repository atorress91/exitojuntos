import { Injectable } from "@angular/core";
import Swal, { SweetAlertResult } from "sweetalert2";
import { NavigationEnd, Router } from "@angular/router";

import { AuthService } from "../authentication-service/auth.service";
import { filter } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class DocumentCheckService {
  private checkInterval: any;


  constructor(private authService: AuthService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/signin') {
        if (this.checkInterval) {
          clearInterval(this.checkInterval);
          this.checkInterval = null;
        }
      }
    });


    this.authService.currentUserAffiliate.subscribe(user => {
      if (user && !user.card_id_authorization && !this.isOnSignInRoute()) {
        this.showDocumentCheckIfNotVisible();

        if (this.checkInterval) {
          clearInterval(this.checkInterval);
        }

        this.checkInterval = setInterval(() => {
          this.showDocumentCheckIfNotVisible();
        }, 120000);
      } else {
        if (this.checkInterval) {
          clearInterval(this.checkInterval);
          this.checkInterval = null;
        }
      }
    });
  }

  private isOnSignInRoute(): boolean {
    return window.location.hash === '#/signin';
  }

  async showDocumentCheckIfNotVisible(): Promise<void> {
    if (!Swal.isVisible() && !this.isOnSignInRoute()) {
      await this.showDocumentCheck();
    }
  }

  async showDocumentCheck(): Promise<SweetAlertResult> {
    const result = await Swal.fire({
      title: 'IMPORTANTE',
      html: 'Confirme su información personal y verifique su identidad adjuntando una foto de su documento de identidad y un selfie. Por favor, asegúrese de que el N° de Identificación y la Fecha de nacimiento coincidan con la documentación proporcionada. Para completar esta acción, haga clic en el botón OK',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    });

    if (result.isConfirmed) {
      this.router.navigateByUrl('/app/edit-user');
    }

    return result;
  }
}
