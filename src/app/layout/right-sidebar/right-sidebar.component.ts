import { DOCUMENT, CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  AfterViewInit,
  Renderer2,
  HostListener,
  ChangeDetectionStrategy,
} from '@angular/core';

import { RightSidebarService } from 'src/app/core/service/rightsidebar-service/rightsidebar.service';

import { LogoService } from '@app/core/service/logo-service/logo.service';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '@app/core/service/config/config.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.sass'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class RightSidebarComponent implements OnInit, AfterViewInit {
  selectedBgColor = 'white';
  maxHeight: string;
  maxWidth: string;
  showpanel = false;
  isOpenSidebar: boolean;
  isDarkSidebar = false;
  isDarTheme = false;
  headerHeight = 60;
  public config: any = {};

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly renderer: Renderer2,
    public readonly elementRef: ElementRef,
    private readonly rightSidebarService: RightSidebarService,
    private readonly configService: ConfigService,
    private readonly logoService: LogoService,
  ) {}

  ngOnInit() {
    this.config = this.configService.configData;
    this.rightSidebarService.sidebarState.subscribe(isRunning => {
      this.isOpenSidebar = isRunning;
    });
    this.setMenuHeight();
  }

  ngAfterViewInit() {
    this.initializeThemeColor();
    this.initializeSidebarMode();
    this.initializeThemeMode();
  }

  private initializeThemeColor(): void {
    if (localStorage.getItem('choose_skin')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('choose_skin'),
      );
      this.selectedBgColor = localStorage.getItem('choose_skin_active');
    } else {
      this.renderer.addClass(
        this.document.body,
        'theme-' + this.config.layout.theme_color,
      );
      this.selectedBgColor = this.config.layout.theme_color;
    }
  }

  private initializeSidebarMode(): void {
    const menuOption = localStorage.getItem('menuOption');
    if (menuOption) {
      this.isDarkSidebar = menuOption === 'dark-sidebar';
    } else {
      this.isDarkSidebar =
        this.config.layout.sidebar.backgroundColor === 'dark';
    }
  }

  private initializeThemeMode(): void {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.isDarTheme = theme === 'dark';
    } else {
      this.isDarTheme = this.config.layout.variant === 'dark';
    }
  }
  @HostListener('window:resize', ['$event'])
  windowResizecall(event) {
    this.setMenuHeight();
  }
  setMenuHeight() {
    const height = window.innerHeight - this.headerHeight;
    this.maxHeight = height + '';
  }

  selectTheme(e) {
    this.selectedBgColor = e;
    const prevTheme = this.elementRef.nativeElement.querySelector(
      '.choose-theme li.active',
    ).dataset.theme;
    this.renderer.removeClass(this.document.body, 'theme-' + prevTheme);
    this.renderer.addClass(this.document.body, 'theme-' + this.selectedBgColor);
    localStorage.setItem('choose_skin', 'theme-' + this.selectedBgColor);
    localStorage.setItem('choose_skin_active', this.selectedBgColor);
  }
  lightSidebarBtnClick() {
    this.renderer.removeClass(this.document.body, 'dark-sidebar');
    this.renderer.addClass(this.document.body, 'light-sidebar');
    const menuOption = 'light-sidebar';
    localStorage.setItem('menuOption', menuOption);
  }
  darkSidebarBtnClick() {
    this.renderer.removeClass(this.document.body, 'light-sidebar');
    this.renderer.addClass(this.document.body, 'dark-sidebar');
    const menuOption = 'dark-sidebar';
    localStorage.setItem('menuOption', menuOption);
  }
  lightThemeBtnClick() {
    this.logoService.toggleTheme(false);
    this.renderer.removeClass(this.document.body, 'dark');
    this.renderer.removeClass(this.document.body, 'dark-sidebar');

    if (localStorage.getItem('choose_skin')) {
      this.renderer.removeClass(
        this.document.body,
        localStorage.getItem('choose_skin'),
      );
    } else {
      this.renderer.removeClass(
        this.document.body,
        'theme-' + this.config.layout.theme_color,
      );
    }

    this.renderer.addClass(this.document.body, 'light');
    this.renderer.addClass(this.document.body, 'light-sidebar');
    this.renderer.addClass(this.document.body, 'theme-white');
    const theme = 'light';
    const menuOption = 'light-sidebar';
    this.selectedBgColor = 'white';
    this.isDarkSidebar = false;
    localStorage.setItem('choose_skin', 'theme-white');
    localStorage.setItem('theme', theme);
    localStorage.setItem('menuOption', menuOption);
  }
  darkThemeBtnClick() {
    this.logoService.toggleTheme(true);
    this.renderer.removeClass(this.document.body, 'light');
    this.renderer.removeClass(this.document.body, 'light-sidebar');

    if (localStorage.getItem('choose_skin')) {
      this.renderer.removeClass(
        this.document.body,
        localStorage.getItem('choose_skin'),
      );
    } else {
      this.renderer.removeClass(
        this.document.body,
        'theme-' + this.config.layout.theme_color,
      );
    }

    this.renderer.addClass(this.document.body, 'dark');
    this.renderer.addClass(this.document.body, 'dark-sidebar');
    this.renderer.addClass(this.document.body, 'theme-black');
    const theme = 'dark';
    const menuOption = 'dark-sidebar';
    this.selectedBgColor = 'black';
    this.isDarkSidebar = true;
    localStorage.setItem('choose_skin', 'theme-black');
    localStorage.setItem('theme', theme);
    localStorage.setItem('menuOption', menuOption);
  }
  toggleRightSidebar(): void {
    this.isOpenSidebar = !this.isOpenSidebar;
    this.rightSidebarService.setRightSidebar(this.isOpenSidebar);
  }
}
