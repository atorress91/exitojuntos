import { Injectable } from '@angular/core';
import { InConfiguration } from '@app/core/models/config-interface-model/config.interface.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public configData: InConfiguration;

  constructor() {
    this.setConfigData();
  }

  setConfigData() {
    this.configData = {
      layout: {
        variant: 'dark', // options:  light & dark - Changed to dark for golden theme
        theme_color: 'green', // Aquí defines el tema verde
        sidebar: {
          collapsed: false, // options:  true & false
          backgroundColor: 'dark', // options:  light & dark - Changed to dark for golden theme
        },
      },
    };
  }
}
