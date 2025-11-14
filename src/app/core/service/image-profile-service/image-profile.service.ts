import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../authentication-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ImageProfileService {
  private readonly imageURLSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  imageURL$ = this.imageURLSubject.asObservable();

  constructor(private readonly authService: AuthService) {
    const imageUrl = this.authService.currentUserAffiliateValue
      ? this.authService.currentUserAffiliateValue.imageProfileUrl
      : null;

    this.setImageURL(imageUrl);
  }

  setImageURL(url: string | null) {
    this.imageURLSubject.next(url);
  }
}
