import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TermsConditionsService {
  private showModalSubject = new Subject<void>();
  showModal$ = this.showModalSubject.asObservable();

  constructor() { }

  show() {
    this.showModalSubject.next();
  }
}
