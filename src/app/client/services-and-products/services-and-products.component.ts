import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterLink} from "@angular/router";
import {ProductsComponent} from "@app/client/products/products.component";

@Component({
    selector: 'app-services-and-products',
    templateUrl: './services-and-products.component.html',
    styleUrls: ['./services-and-products.component.sass'],
    standalone: true,
  imports: [CommonModule, TranslateModule, NgbModule, RouterLink, ProductsComponent]
})
export class ServicesAndProductsComponent implements OnInit {
  active: any;

  constructor() {

  }

  ngOnInit(): void {

  }

  showAlert() {
    Swal.fire({
      title: 'Novedades en camino',
      html: `
            <p>¡Estamos emocionados de anunciar que próximamente estarán disponibles nuevos servicios y productos!</p>
            <p>Manténgase al tanto para descubrir lo que hemos preparado para usted.</p>
        `,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#3085d6',
      showCancelButton: false,
    }).then((result) => {
      if (result.isConfirmed) {

      }
    });
  }

  onTabChange(newActive: number) {
    this.active = newActive;
  }
}
