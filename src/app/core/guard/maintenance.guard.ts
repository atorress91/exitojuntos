import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../service/configuration-service/configuration.service';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceGuard {
  isUnderMaintenance: boolean = false;
  private readonly router: Router = inject(Router);
  private readonly configurationService: ConfigurationService =
    inject(ConfigurationService);

  constructor() {
    // Temporalmente desactivado para desarrollo
    // this.configurationService.checkMaintenance().subscribe(maintenance => {
    //   this.isUnderMaintenance = maintenance;
    // });
  }

  canActivate(): Observable<boolean> {
    // Temporalmente desactivado para desarrollo
    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });

    // Código original comentado - descomentar cuando esté listo para producción
    // return this.configurationService.checkMaintenance().pipe(
    //   map(isUnderMaintenance => {
    //     if (isUnderMaintenance) {
    //       this.router.navigate(['/maintenance']);
    //       return false;
    //     }
    //     return true;
    //   }),
    // );
  }
}
