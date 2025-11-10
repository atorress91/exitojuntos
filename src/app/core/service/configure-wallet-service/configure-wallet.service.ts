import { inject, Injectable, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigureWalletService {
  private readonly modalService: NgbModal = inject(NgbModal);
  configureWalletModal: TemplateRef<any>;
  activeModal: any;
  private readonly modalOpenedSource = new Subject<void>();
  modalOpened$ = this.modalOpenedSource.asObservable();

  constructor() {}

  setModalContent(content: TemplateRef<any>) {
    this.configureWalletModal = content;
  }

  openConfigureWalletModal() {
    if (!this.configureWalletModal) {
      throw new Error('Error');
    }
    this.activeModal = this.modalService.open(this.configureWalletModal, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      centered: true,
    });

    this.modalOpenedSource.next();
  }

  closeConfigureWalletModal() {
    this.activeModal.close();
  }
}
