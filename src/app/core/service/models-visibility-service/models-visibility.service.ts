import { inject, Injectable, computed } from '@angular/core';
import { ConfigurationService } from '../configuration-service/configuration.service';
import { AuthService } from '../authentication-service/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ModelsVisibilityService {
  private readonly configService: ConfigurationService =
    inject(ConfigurationService);
  private readonly authService: AuthService = inject(AuthService);

  private readonly configSignal = toSignal(
    this.configService.getGeneralConfiguration(),
    { initialValue: null },
  );

  public canUserSeePaymentModels = computed(() => {
    const config = this.configSignal();
    const userAffiliate = this.authService.userAffiliate();

    if (config?.success && config.data && userAffiliate) {
      const cutoffDate = new Date(config.data.paymentModelCutoffDate);
      return new Date(userAffiliate.created_at) < cutoffDate;
    }
    return true;
  });

  constructor() {}
}
