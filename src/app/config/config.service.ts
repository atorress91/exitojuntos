import { Injectable } from '@angular/core';
import { InConfiguration } from '../core/models/config-interface-model/config.interface.model';

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
        variant: 'light', // options:  light & dark
        theme_color: 'green', // Aquí defines el tema verde
        sidebar: {
          collapsed: false, // options:  true & false
          backgroundColor: 'light', // options:  light & dark
        },
      },
    };
  }

}
