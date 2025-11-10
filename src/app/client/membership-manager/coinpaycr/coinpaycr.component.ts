import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QrcodeModule} from "qrcode-angular";

@Component({
    selector: 'app-coinpaycr',
    templateUrl: './coinpaycr.component.html',
    styleUrls: ['./coinpaycr.component.sass'],
    standalone: true,
  imports: [CommonModule, QrcodeModule]
})
export class CoinpaycrComponent {

}
