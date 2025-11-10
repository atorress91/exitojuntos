import {Component, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-passive-pack-details',
  templateUrl: './passive-pack-details.component.html',
  standalone: true,
  imports: []
})
export class PassivePackDetailsComponent {
  @ViewChild('passivePackDetailModal') passivePackDetailModal: NgbModal;
}
