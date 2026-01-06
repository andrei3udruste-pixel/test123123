import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from './shared/services/language/language';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class App {
  private languageService = inject(LanguageService);
  private translateService = inject(TranslateService);

  constructor() {
    this.translateService.addLangs(this.languageService.languageList);
    this.translateService.setFallbackLang(this.languageService.fallbackLanguage);
    this.translateService.use(this.languageService.selectedLanguage);
  }

}
