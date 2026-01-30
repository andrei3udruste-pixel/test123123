import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideTranslateService} from '@ngx-translate/core';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {errorInterceptor} from './shared/interceptors/error/error-interceptor';
import {authInterceptor} from './shared/interceptors/auth/auth-interceptor';
import {registerLocaleData} from '@angular/common';
import localeRo from '@angular/common/locales/ro';
import localeEn from '@angular/common/locales/en-GB';
import {Languages, LanguageService} from './shared/services/language/language';
import {environment} from '../environments/environment';
import {provideApi} from './openapi/provide-api';

registerLocaleData(localeRo, Languages['ro'].locale);
registerLocaleData(localeEn, Languages['en'].locale);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([errorInterceptor, authInterceptor]),
    ),
    provideApi(environment.apiUrl),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'ro'
    }),
    {
      provide: LOCALE_ID,
      useFactory: (languageService: LanguageService) => {
        return languageService.locale;
      },
      deps: [LanguageService]
    }
  ]
};
