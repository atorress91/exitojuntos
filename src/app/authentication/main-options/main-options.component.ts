import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogoService } from '@app/core/service/logo-service/logo.service';
import { CommonModule } from '@angular/common';
declare var particlesJS: any;

@Component({
    selector: 'app-main-options',
    templateUrl: './main-options.component.html',
    styleUrls: ['./main-options.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class MainOptionsComponent implements OnInit {
  userName: string;
  logoUrl = '';
  constructor(private router: Router, private activateRoute: ActivatedRoute, private logoService: LogoService) {
    this.userName = activateRoute.snapshot.paramMap.get('userName');
  }

  ngOnInit(): void {
    this.getLogoUrl();
    particlesJS.load('particles-js', 'assets/particles/particles.json', function () {
    });
  }

  backToTop() {
    this.router.navigate(['/signin']);
  }

  goToRegister() {
    this.router.navigate([`/signup/${this.userName}`])
  }

  getLogoUrl() {
    this.logoUrl = this.logoService.getLogoSrc();
  }
}
