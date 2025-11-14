import { ImageProfileService } from '@app/core/service/image-profile-service/image-profile.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { AuthService } from '@app/core/service/authentication-service/auth.service';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { AffiliateService } from '@app/core/service/affiliate-service/affiliate.service';
import { UpdateImageProfile } from '@app/core/models/user-affiliate-model/update-image-profile.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-img-profile',
  templateUrl: './img-profile.component.html',
  styleUrls: ['./img-profile.component.sass'],
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule],
})
export class ImgProfileComponent implements OnInit {
  @ViewChild('profileImgModal', { static: true })
  private readonly modalContent: TemplateRef<any>;
  file: File | null = null;
  fileRef: any;
  user: UserAffiliate = new UserAffiliate();

  constructor(
    private readonly modalService: NgbModal,
    private readonly storage: Storage,
    private readonly authService: AuthService,
    private readonly affiliateService: AffiliateService,
    private readonly toastr: ToastrService,
    private readonly imageProfileService: ImageProfileService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserAffiliateValue;
    console.log(this.user);
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  openProfileImgModal() {
    this.modalService.open(this.modalContent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      centered: true,
    });
  }

  onFileSelected(event: any): void {
    this.file = event.addedFiles[0];
    const filePath =
      'affiliates/profile/' + `${this.user.name}/` + `${this.user.id}`;

    this.fileRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(this.fileRef, this.file);

    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => {
        console.log(error);
        this.showError('Error al subir la imagen');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          let updateImage = new UpdateImageProfile();
          updateImage.image_profile_url = downloadURL;

          this.affiliateService
            .updateImageProfile(this.user.id, updateImage)
            .subscribe({
              next: value => {
                this.authService.setUserAffiliateValue(value);
                this.user.imageProfileUrl = downloadURL;
                this.showSuccess('Imagen actualizada correctamente');
              },
              error: () => {
                this.showError('No se pudo actualizar la imagen de perfil.');
              },
            });
        });
      },
    );
  }
  removeImage(): void {
    let updateImage = new UpdateImageProfile();
    updateImage.image_profile_url = '';

    this.affiliateService
      .updateImageProfile(this.user.id, updateImage)
      .subscribe({
        next: value => {
          this.authService.setUserAffiliateValue(value);
          this.user.imageProfileUrl = null;
          this.file = null;
          this.showSuccess('Imagen eliminada correctamente');
        },
        error: () => {
          this.showError('No se pudo eliminar la imagen de perfil.');
        },
      });
  }
}
