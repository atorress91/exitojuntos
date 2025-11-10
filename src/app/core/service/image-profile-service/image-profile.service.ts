import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../authentication-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImageProfileService {
  private imageURLSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  imageURL$ = this.imageURLSubject.asObservable();

  constructor(private authService: AuthService) {
    const imageUrl = (this.authService.currentUserAffiliateValue ? this.authService.currentUserAffiliateValue.image_profile_url : null) ||
      (this.authService.currentUserAdminValue ? this.authService.currentUserAdminValue.image_profile_url : null);

    this.setImageURL(imageUrl);
  }

  setImageURL(url: string | null) {
    this.imageURLSubject.next(url);
  }
}
