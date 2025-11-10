import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipManagerService {
  private showModalSubject = new Subject<void>();
  private closeModalSubject = new Subject<void>();

  showModal$ = this.showModalSubject.asObservable();
  closeModal$ = this.closeModalSubject.asObservable();

  constructor() { }

  show() {
    this.showModalSubject.next();
  }

  close() {
    this.closeModalSubject.next();
  }
}
