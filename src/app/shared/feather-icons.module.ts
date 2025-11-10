import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Módulo con todos los iconos configurados
@NgModule({
  imports: [FeatherModule.pick(allIcons)],
  exports: [FeatherModule],
})
export class IconsModule {}


