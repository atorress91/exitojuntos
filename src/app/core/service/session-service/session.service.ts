import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly idleTimeout = 30 * 60 * 1000;
  private idleTimer: any;
  private userActivity = new Subject<void>();


  constructor(private ngZone: NgZone, private router: Router) {
    this.listenToUserActivity();
    this.startTimer();
  }

  private listenToUserActivity(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', () => this.ngZone.run(() => this.userHasBeenActive()));
      window.addEventListener('keypress', () => this.ngZone.run(() => this.userHasBeenActive()));
      window.addEventListener('scroll', () => this.ngZone.run(() => this.userHasBeenActive()));
    });
  }

  private userHasBeenActive(): void {
    this.userActivity.next();
  }

  private startTimer(): void {
    this.userActivity.subscribe(() => {
      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {

        this.router.navigate(['/signin']).then();
      }, this.idleTimeout);
    });
  }
}
