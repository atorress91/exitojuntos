import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public languages: string[] = ['en', 'es'];

  constructor(public translate: TranslateService) {
    let browserLang;
    translate.addLangs(this.languages);

    if (localStorage.getItem('lang')) {
      browserLang = localStorage.getItem('lang');
    } else {
      browserLang = translate.getBrowserLang();
    }
    translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
  }

  public setLanguage(lang) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
