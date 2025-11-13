import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UserAffiliate } from '../../../core/models/user-affiliate-model/user.affiliate.model';
import { Country } from '../../../core/models/country-model/country.model';
import { AffiliateService } from '../../../core/service/affiliate-service/affiliate.service';
import { CountryService } from '@app/core/service/country-service/country.service';

@Component({
  selector: 'app-affiliates-list-edit-modal',
  templateUrl: './affiliates-list-edit-modal.component.html',
  styleUrls: ['./affiliates-list-edit-modal.component.scss'],
  providers: [ToastrService],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    TranslateModule,
  ],
})
export class AffiliatesListEditModalComponent implements OnInit {
  editAffiliateForm: FormGroup;
  submitted = false;
  listCountry: Country[] = [];
  affiliate = new UserAffiliate();
  @ViewChild('affiliateEditModal') affiliateEditModal: NgbModal;
  @Output() loadAffiliateList: EventEmitter<any> = new EventEmitter();
  private readonly countryService: CountryService = inject(CountryService);

  constructor(
    private readonly modalService: NgbModal,
    private readonly formBuilder: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly affiliateService: AffiliateService,
  ) {}

  editOpenModal(content, affiliate: UserAffiliate) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
    this.affiliate = affiliate;
    this.fetchCountry();
    this.getUserInfo(this.affiliate.id);
  }

  setValues(affiliate: UserAffiliate) {
    this.affiliate = affiliate;

    let birthdayFormatted: string;
    const birthdayDate = new Date(affiliate.birtDate);
    birthdayFormatted = birthdayDate.toISOString().split('T')[0];

    this.editAffiliateForm.setValue({
      identification: affiliate.identification,
      user_name: affiliate.name,
      name: affiliate.name,
      last_name: affiliate.lastName,
      email: affiliate.email,
      phone: affiliate.phone,
      address: affiliate.address ?? '',
      status: affiliate.status !== true,
      country: affiliate.country,
      zip_code: affiliate.zipCode,
      created_at: affiliate.createdAt,
      birthday: birthdayFormatted,
    });
  }

  ngOnInit(): void {
    this.loadValidations();
  }

  getUserInfo(id: number) {
    this.affiliateService.getAffiliateById(id).subscribe(response => {
      if (response.success) {
        this.setValues(response.data);
      }
    });
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Success!');
  }

  showError(message: string) {
    this.toastr.error(message, 'Error!');
  }

  private fetchCountry() {
    this.countryService.getCountries().subscribe(data => {
      this.listCountry = data;
    });
  }

  loadValidations() {
    this.editAffiliateForm = this.formBuilder.group({
      identification: [],
      user_name: new FormControl({ value: '', disabled: true }),
      name: new FormControl({ value: '', disabled: true }),
      last_name: new FormControl({ value: '', disabled: true }),
      email: ['', Validators.required],
      father: new FormControl({ value: '', disabled: true }),
      phone: ['', Validators.required],
      address: [],
      country: [],
      tax_id: [],
      zip_code: [],
      created_at: new FormControl({ value: '', disabled: true }),
      birthday: [],
      status: [],
      beneficiary_name: [],
      legal_authorized_first: [],
      legal_authorized_second: [],
    });
  }

  onEditRowSave() {
    this.submitted = true;
    if (this.editAffiliateForm.invalid) {
      return;
    }

    this.affiliate.identification = this.editAffiliateForm.value.identification;
    this.affiliate.phone = this.editAffiliateForm.value.phone;
    this.affiliate.address = this.editAffiliateForm.value.address;
    this.affiliate.zipCode = this.editAffiliateForm.value.zip_code;
    this.affiliate.email = this.editAffiliateForm.value.email;
    this.affiliate.country = this.editAffiliateForm.value.country;
    this.affiliate.birtDate = this.editAffiliateForm.value.birthday;
    this.affiliate.status = !this.editAffiliateForm.value.status;

    this.affiliateService
      .updateAffiliate(this.affiliate)
      .subscribe((response: UserAffiliate) => {
        if (response == null) {
          this.showError('Error!');
          console.log('error', response);
          return;
        }
        this.showSuccess('The credentials is valid!');
        this.setValues(response);
      });
  }

  closeModals() {
    this.modalService.dismissAll();
  }
}
