import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-virtual-wallet',
  templateUrl: './virtual-wallet.component.html',
  standalone: true,
  imports: [
    RouterLink
  ]
})
export class VirtualWalletComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
