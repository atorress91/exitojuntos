import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Para módulos tradicionales (si aún los usas)
@NgModule({
  imports: [NgbModule],
  exports: [NgbModule],
})
export class BootstrapModule {}

// Para componentes standalone - solo importa esto
export function provideBootstrap() {
  return NgbModule;
}

