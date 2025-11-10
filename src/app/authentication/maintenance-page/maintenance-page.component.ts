import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-maintenance',
    templateUrl: './maintenance-page.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class MaintenancePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
