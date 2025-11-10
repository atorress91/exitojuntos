import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-page404',
    templateUrl: './page404.component.html',
    styleUrls: ['./page404.component.sass'],
    standalone: true,
    imports: [CommonModule, RouterLink]
})
export class Page404Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
