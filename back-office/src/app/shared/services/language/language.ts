import {computed, inject, Injectable, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

export interface ILanguage {
  locale: string;
}

export const Languages: Record<string, ILanguage> = {
  en: {
    locale: 'en-GB'
  },
  ro: {
    locale: 'ro-RO'
  }
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translateService = inject(TranslateService);

  public readonly languageList = Object.keys(Languages);
  public readonly fallbackLanguage = Object.keys(Languages)[0];

  private _selectedLanguage = signal<string>(this.getLanguageLocalStorage() ? this.getLanguageLocalStorage()! : this.fallbackLanguage);
  private _locale = computed(() => Languages[this._selectedLanguage()].locale);
  // locale system should be changed so that the DatePipe responds naturally to the change in locale

  get selectedLanguage(): string {
    return this._selectedLanguage()!;
  }

  set selectedLanguage(language: string) {
    if (!Object.keys(Languages)) {
      language = this.fallbackLanguage;
    }
    this._selectedLanguage.set(language);
    this.translateService.use(language);
    this.setLanguageLocalStorage(language);
  }

  get locale(): string {
    return this._locale();
  }

  private getLanguageLocalStorage(): string | null {
    return localStorage.getItem('language');
  }

  private setLanguageLocalStorage(language: string): void {
    localStorage.setItem('language', language);
  }
}
