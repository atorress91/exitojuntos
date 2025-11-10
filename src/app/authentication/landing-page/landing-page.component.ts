import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { AffiliateService } from '@app/core/service/affiliate-service/affiliate.service';
import { AuthService } from '@app/core/service/authentication-service/auth.service';
import { PdfViewerService } from '@app/core/service/pdf-viewer-service/pdf-viewer.service';

@Component({
  selector: 'app-home',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ToastrService],
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  isNavbarVisible = false;
  documents = {
    whitePaper: {
      url: 'assets/pdf/WhitePaper-2025.pdf',
      title: 'White Paper - exitojuntos',
    },
    legalDoc: {
      url: 'assets/pdf/LEGAL-DOCUMENTATION.pdf',
      title: 'Documentos Legales - exitojuntos',
    },
    exitojuntosProject: {
      url: 'assets/pdf/PROJECT.pdf',
      title: 'Proyecto exitojuntos',
    },
  };
  showVideoModal: boolean = false;
  currentVideoUrl: string = '';
  currentLang: string = 'en';
  isLanguageDropdownOpen: boolean = false;
  key: string = '';
  videos = {
    es: {
      url: '5VY0Hu8EW-c',
      title: 'Ver Video Informativo',
    },
    en: {
      url: '5VY0Hu8EW-c',
      title: 'Watch Information Video',
    },
  };
  isPreviewHovered: boolean = false;
  user: UserAffiliate | null = null;
  readonly heroBadgeIcon =
    'http://localhost:3845/assets/3c401de71f800381f5c16ef34f995b986fd77e8a.svg';
  readonly primaryCtaArrow =
    'http://localhost:3845/assets/a7192e3012b5752bade6097f220689a7d2e51987.svg';
  readonly heroMetrics = [
    { value: '98%', label: 'Rentabilidad' },
    { value: '$500M+', label: 'Gestionados' },
    { value: '10K+', label: 'Inversores' },
  ];
  readonly featureCards = [
    {
      icon: 'http://localhost:3845/assets/80819031e76017bd517565cc42b826335cd6ee71.svg',
      title: 'Trading Avanzado',
      description:
        'Algoritmos de última generación para maximizar tus inversiones en tiempo real.',
    },
    {
      icon: 'http://localhost:3845/assets/f0694d23ee7958f3a0e8434ac113f4f1352d8eec.svg',
      title: 'Seguridad Total',
      description:
        'Tus activos protegidos con la más alta tecnología de seguridad bancaria.',
    },
    {
      icon: 'http://localhost:3845/assets/fc033a589e0002eabc41938a863af3b62d8c4a12.svg',
      title: 'Análisis Profundo',
      description:
        'Informes detallados y análisis de mercado para decisiones informadas.',
    },
    {
      icon: 'http://localhost:3845/assets/7b82b2bbbc7c993d1074ef61287a1b8ddd78de3e.svg',
      title: 'Asesoría Personalizada',
      description:
        'Expertos dedicados a ayudarte a alcanzar tus objetivos financieros.',
    },
    {
      icon: 'http://localhost:3845/assets/8fd443f91037a0a337782428f666cb19c33249bd.svg',
      title: 'Transparencia',
      description:
        'Total claridad en cada operación y movimiento de tu portafolio.',
    },
    {
      icon: 'http://localhost:3845/assets/aa37dbe936e8d70fc5983981bcd5bb9717108ead.svg',
      title: '24/7 Soporte',
      description:
        'Atención continua para que nunca te pierdas una oportunidad.',
    },
  ];
  readonly tradingImage =
    'http://localhost:3845/assets/9bd020dd4ae51ecff92b1fb2f7dad9e3e183f38f.png';
  readonly tradingHighlights = [
    'Rendimientos superiores al mercado',
    'Diversificación inteligente de portafolio',
    'Gestión de riesgos avanzada',
    'Acceso a mercados exclusivos',
  ];
  readonly processSteps = [
    {
      number: '01',
      icon: 'http://localhost:3845/assets/1c6a0e53dd2b43962f96c618836cd981da083d4b.svg',
      title: 'Registro',
      description:
        'Crea tu cuenta en minutos y verifica tu identidad de forma segura.',
    },
    {
      number: '02',
      icon: 'http://localhost:3845/assets/131e0cea5495b97a18f68d4a3b29e4e2318c6b1d.svg',
      title: 'Planificación',
      description:
        'Nuestros expertos diseñan una estrategia personalizada para ti.',
    },
    {
      number: '03',
      icon: 'http://localhost:3845/assets/d712dd98e4a997541db06fe96ceed1a1d55b03e1.svg',
      title: 'Inversión',
      description:
        'Comienza a invertir con el respaldo de tecnología de punta.',
    },
    {
      number: '04',
      icon: 'http://localhost:3845/assets/8e9b89a2cde130a1f9941c2c621355c09d5edd39.svg',
      title: 'Crecimiento',
      description: 'Observa cómo tu patrimonio crece consistentemente.',
    },
  ];
  readonly testimonials = [
    {
      quote:
        '"La mejor decisión financiera que he tomado. En 6 meses, mi portafolio creció un 85%. El equipo es excepcional."',
      avatar:
        'http://localhost:3845/assets/2d702b4643fed9dee21ff4a592efd1c7f02aafea.png',
      name: 'Carlos Mendoza',
      role: 'CEO, TechVentures',
      ratingIcon:
        'http://localhost:3845/assets/ba5059ac525a3cfa66ce24590254d9acee795470.svg',
    },
    {
      quote:
        '"Profesionalismo y resultados reales. La asesoría personalizada marca la diferencia. Altamente recomendado."',
      avatar:
        'http://localhost:3845/assets/179432017b8aa99523aa5b803b64a24cf225af37.png',
      name: 'María González',
      role: 'Emprendedora',
      ratingIcon:
        'http://localhost:3845/assets/9b9e0af306f726351a1a3758407ea439212559fc.svg',
    },
    {
      quote:
        '"Transparencia total y rendimientos consistentes. Finalmente encontré una plataforma en la que puedo confiar."',
      avatar:
        'http://localhost:3845/assets/cfc1845553d5f5393389f2f566f5fbef7000f264.png',
      name: 'Roberto Silva',
      role: 'Inversor',
      ratingIcon:
        'http://localhost:3845/assets/d85a2477b3381e4b703b4cce290b87217dc41ed1.svg',
    },
  ];
  readonly testimonialQuoteIcon =
    'http://localhost:3845/assets/2bbd6c1d8a13df267c1df36b0fdf75c37dcc0908.svg';
  readonly brandIcon =
    'http://localhost:3845/assets/8fba254d53d06879b6ce147ba562694df72be274.svg';
  readonly navbarIcon =
    'http://localhost:3845/assets/7a342e45483c9935e729a8ca91bab824f26fb7bf.svg';
  readonly contactIcons = {
    mail: 'http://localhost:3845/assets/0d4acf61cde196e73207d14cabcc538011f9b851.svg',
    phone:
      'http://localhost:3845/assets/f45c4b2bf363f4f1d7be27ae50d30670830fc5b6.svg',
    location:
      'http://localhost:3845/assets/edf8efb3efacd6bbc922dffca4687c1b1c1f8557.svg',
  };
  readonly ctaStats = [
    { value: 'A+', label: 'Calificación' },
    { value: '100%', label: 'Seguro' },
    { value: '24/7', label: 'Soporte' },
  ];
  readonly footerLinks = [
    {
      heading: 'Enlaces',
      items: [
        { label: 'Servicios', href: '#servicios' },
        { label: 'Nosotros', href: '#nosotros' },
        { label: 'Testimonios', href: '#testimonios' },
        { label: 'Contacto', href: '#contacto' },
      ],
    },
    {
      heading: 'Legal',
      items: [
        { label: 'Privacidad', href: '#privacidad' },
        { label: 'Términos', href: '#terminos' },
        { label: 'Regulación', href: '#regulacion' },
        { label: 'Seguridad', href: '#seguridad' },
      ],
    },
  ];

  constructor(
    private readonly pdfViewerService: PdfViewerService,
    private readonly translate: TranslateService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly affiliateService: AffiliateService,
    private readonly authService: AuthService,
  ) {
    translate.setFallbackLang('en');
    this.currentLang = translate.getCurrentLang() || 'en';
    this.key = this.activatedRoute.snapshot.params.key;

    // Si hay un usuario logueado, usar sus datos
    const loggedUser = this.authService.userAffiliate();
    if (loggedUser) {
      this.user = loggedUser;
    } else if (this.key) {
      // Si no hay usuario logueado pero hay key en la ruta, buscar por username
      this.getUserByUsername(this.key);
    }
  }

  ngOnInit() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.changeLanguage(savedLang);
    } else {
      this.changeLanguage('en');
    }
  }

  ngOnDestroy() {
    this.closeVideo();
  }

  triggerAutomaticVideo(): void {
    this.showPreview();
    this.showVideo();
  }

  getUserByUsername(key: string) {
    if (!key) return;
    this.affiliateService
      .getAffiliateByUserName(key)
      .subscribe((user: UserAffiliate) => {
        if (user !== null) {
          this.user = user;
        }
      });
  }

  changeLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.isLanguageDropdownOpen = false;
  }

  toggleLanguageDropdown(event: Event) {
    event.stopPropagation();
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    const clickedElement = event.target as HTMLElement;
    const isLanguageSelector = clickedElement.closest('.language-selector');
    if (!isLanguageSelector) {
      this.isLanguageDropdownOpen = false;
    }
  }

  showDocument(
    docType: 'whitePaper' | 'legalDoc' | 'exitojuntosProject',
  ): void {
    const document = this.documents[docType];
    this.pdfViewerService.showPdf(document);
  }

  toggleNavbar() {
    this.isNavbarVisible = !this.isNavbarVisible;
  }

  openNewTab(url: string) {
    window.open(url, '_blank');
  }

  showVideo(): void {
    const videoId = this.videos[this.currentLang].url;

    this.currentVideoUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
    this.showVideoModal = true;
  }

  closeVideo(): void {
    this.showVideoModal = false;
    this.currentVideoUrl = '';
    document.body.style.overflow = 'auto';
    this.hidePreview();
  }

  showPreview(): void {
    this.isPreviewHovered = true;
  }

  hidePreview(): void {
    this.isPreviewHovered = false;
  }
}
