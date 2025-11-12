import { FaceApiService } from '@app/core/service/face-api-service/face-api.service';
import { Component, ViewChild, OnInit, OnDestroy, inject } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Country } from '@app/core/models/country-model/country.model';
import { UpdateImageIdPath } from '@app/core/models/user-affiliate-model/update-image-id-path.model';
import { AffiliateService } from '@app/core/service/affiliate-service/affiliate.service';
import { AuthService } from '@app/core/service/authentication-service/auth.service';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TranslateModule } from '@ngx-translate/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from '@app/core/service/country-service/country.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    TranslateModule,
    NgbNavModule,
  ],
})
export class EditUserComponent implements OnInit, OnDestroy {
  public user: UserAffiliate = new UserAffiliate();
  public userCookie: UserAffiliate;
  updateImageIdPath: UpdateImageIdPath = new UpdateImageIdPath();
  private readonly ngUnsubscribe = new Subject<void>();
  updateUserForm: FormGroup;
  listcountry: Country[] = [];
  loadingIndicator = true;
  reorderable = true;
  active = 1;
  files: File[] = [];
  uploadTask: any;
  fileRef: any;
  private isUploadCompleted = false;
  progress = 0;
  displayBirthday: string | null = null;
  private readonly countryService: CountryService = inject(CountryService);

  @ViewChild('table') table: DatatableComponent;

  constructor(
    private readonly toastr: ToastrService,
    private readonly authService: AuthService,
    private readonly affiliateService: AffiliateService,
    private readonly formBuilder: FormBuilder,
    private readonly storage: Storage,
    private readonly faceApiService: FaceApiService,
  ) {}

  ngOnInit(): void {
    this.faceApiService
      .getFunctionUpload()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.startUpload();
      });

    this.userValidations();
    this.fetchCountry();
    this.getUserInfo();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  showError(message) {
    this.toastr.error(message, 'Error!');
  }

  showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  userValidations() {
    this.updateUserForm = this.formBuilder.group({
      identification: ['', Validators.required],
      name: new FormControl({ value: '', disabled: true }),
      lastName: new FormControl({ value: '', disabled: true }),
      email: new FormControl({ value: '', disabled: true }),
      father: new FormControl({ value: '', disabled: true }),
      phone: ['', Validators.required],
      address: [],
      country: [],
      zipCode: [],
      createdAt: new FormControl({ value: '', disabled: true }),
      birtDate: [],
      side: new FormControl({ value: '', disabled: true }),
    });
  }

  setValues(affiliate: UserAffiliate) {
    let formattedBirthday = null;
    if (affiliate.birtDate) {
      const birthdayDate = new Date(affiliate.birtDate);

      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      this.displayBirthday = birthdayDate.toLocaleDateString('es-ES', options);

      formattedBirthday = birthdayDate.toISOString().split('T')[0];
    }

    this.updateUserForm.patchValue({
      identification: affiliate.identification ?? '',
      name: affiliate.name ?? '',
      lastName: affiliate.lastName ?? '',
      email: affiliate.email ?? '',
      side: affiliate.side?.toString() ?? '0',
      father: affiliate.father?.toString() ?? '',
      phone: affiliate.phone ?? '',
      address: affiliate.address ?? '',
      country: affiliate.country?.id ?? '',
      zipCode: affiliate.zipCode ?? '',
      createdAt: affiliate.createdAt ?? '',
      birtDate: formattedBirthday,
    });

    if (affiliate.birtDate) {
      this.updateUserForm.get('birtDate').disable();
    }

    if (affiliate.identification) {
      this.updateUserForm.get('identification').disable();
    }
  }

  checkAndDisableInput() {}

  getUserInfo() {
    this.userCookie = this.authService.currentUserAffiliateValue;
    this.setValues(this.userCookie);
    this.affiliateService
      .getAffiliateById(this.userCookie.id)
      .subscribe(response => {
        if (response.success) {
          this.user = response.data;
          this.setValues(this.user);
        }
      });
  }

  private fetchCountry() {
    this.countryService.getCountries().subscribe(data => {
      this.listcountry = data;
    });
  }

  onSelect(event) {
    if (this.files.length === 0) {
      this.files.push(...event.addedFiles);
    }
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSaveUser() {
    let userUpdate = new UserAffiliate();

    userUpdate.id = this.user.id;
    userUpdate.identification = this.updateUserForm.get('identification').value;
    userUpdate.phone = this.updateUserForm.get('phone').value;
    userUpdate.address = this.updateUserForm.get('address').value;
    userUpdate.zipCode = this.updateUserForm.get('zipCode').value;

    const countryId = this.updateUserForm.get('country').value;
    if (countryId) {
      userUpdate.country = { id: countryId };
    }

    const birtDate = this.updateUserForm.get('birtDate').value;
    if (birtDate) {
      userUpdate.birtDate = birtDate;
    }

    this.affiliateService
      .updateUserProfile(userUpdate)
      .subscribe((response: UserAffiliate) => {
        if (response) {
          this.showSuccess('La información se actualizó correctamente!');
          this.setValues(response);
        } else {
          this.showError('Error!');
        }
      });
  }

  onFileSelected(event: any): void {
    const files: File[] = Array.from(event.addedFiles);

    if (this.files.length + files.length <= 2) {
      this.files.push(...files);

      if (this.files.length == 2) {
        this.updateCardIdAuthorization(1);
        this.authService.setUserAffiliateValue(this.user);
      }
      // });
    } else {
      this.showError('Error: demasiados archivos seleccionados.');
      this.updateCardIdAuthorization(0);
    }

    const filePath = 'affiliates/' + `${this.user.name}/` + `${this.user.id}`;
    this.fileRef = ref(this.storage, filePath);
  }

  private updateProgress(snapshot): void {
    this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  }

  private handleError(error): void {
    this.toastr.error('Upload failed');
  }

  private handleComplete(): void {
    getDownloadURL(this.uploadTask.snapshot.ref)
      .then(downloadURL => this.updateAffiliateImage(downloadURL))
      .catch(err => this.handleUpdateError(err));
  }

  private async updateAffiliateImage(downloadURL: string): Promise<void> {
    this.updateImageIdPath.image_id_path = downloadURL;
    this.updateImageIdPath.id = this.user.id;

    try {
      await this.affiliateService
        .updateImageIdPath(this.updateImageIdPath)
        .toPromise();
      this.handleUpdateSuccess();
    } catch (err) {
      this.handleUpdateError(err);
    }
  }

  private handleUpdateSuccess(): void {
    if (!this.isUploadCompleted) {
      this.toastr.success('Image updated successfully');
      this.faceApiService.startUploadFuntion();
      this.files = [];
      this.getUserInfo();
      this.isUploadCompleted = true;
    }
  }

  private handleUpdateError(err): void {
    this.toastr.error('Error updating affiliate image');
  }

  startUpload(): void {
    this.isUploadCompleted = false;
    this.uploadTask = uploadBytesResumable(this.fileRef, this.files[0]);

    this.uploadTask.on(
      'state_changed',
      snapshot => this.updateProgress(snapshot),
      error => this.handleError(error),
      () => this.handleComplete(),
    );
  }

  deleteImage() {
    const filePath = 'affiliates/' + `${this.user.id}/` + `${this.user.id}`;
    this.updateImageIdPath.id = this.user.id;
    this.affiliateService.updateImageIdPath(this.updateImageIdPath).subscribe({
      next: () => {
        this.showSuccess('Image deleted successfully');
        this.files = [];
      },
      error: () => {
        this.toastr.error('error');
      },
    });
  }

  deleteFile(index: number): void {
    if (this.files.length > 0 && index < this.files.length) {
      this.files.splice(index, 1);
    }
  }

  updateCardIdAuthorization(option: number) {
    this.affiliateService
      .updateCardIdAuthorization(this.user.id, option)
      .subscribe({
        next: value => {
          if (value.card_id_authorization) {
            this.showSuccess('Afiliado verificado correctamente');
          } else {
            this.showError('Su verificación se encuentra pendiente');
          }
        },
        error: err => {
          this.showError('No se pudo verificar el afiliado');
        },
      });
  }
}
