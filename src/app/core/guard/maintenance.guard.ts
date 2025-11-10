import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ConfigurationService } from '../service/configuration-service/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceGuard  {
  isUnderMaintenance: boolean = false;

  constructor(private router: Router, private configurationService: ConfigurationService) {
    this.configurationService.checkMaintenance().subscribe((maintenance) => {
      this.isUnderMaintenance = maintenance;
    });
  }

  canActivate(): Observable<boolean> {
    return this.configurationService.checkMaintenance().pipe(
      map((isUnderMaintenance) => {
        if (isUnderMaintenance) {
          this.router.navigate(['/maintenance']);
          return false;
        }
        return true;
      })
    );
  }
}
