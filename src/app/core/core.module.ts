import { registerLocaleData } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import locale from '@angular/common/locales/en';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { fontAwesomeIcons } from './icons/font-awesome-icons';
import { AuthInterceptor } from './interceptors/auth.interceptors';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { LoaderService } from '../shared/components/loader/loader.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NotificationInterceptor } from './interceptors/notification.interceptor';
import { StateStorageService } from './auth/state-storage.service';
import { CookieModule } from 'ngx-cookie';
import { Router } from '@angular/router';
import { AccountService } from './auth/account.service';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { FB_APP_ID } from '../shared/constants';

const FB_LOGIN_OPTS = {
  scope: 'pages_messaging, email',
  return_scopes: true,
  enable_profile_selector: true
};

@NgModule({
  imports: [
    HttpClientModule,
    SocialLoginModule,
    CookieModule.forRoot(),
    NgxWebstorageModule.forRoot({ prefix: 'joniks', separator: '-' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en',
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(FB_APP_ID, FB_LOGIN_OPTS),
          }
        ],
      } as SocialAuthServiceConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
      deps: [LoaderService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [Router, StateStorageService, AccountService]
    }
  ],
})
export class CoreModule {
  constructor(iconLibrary: FaIconLibrary) {
    registerLocaleData(locale);
    iconLibrary.addIconPacks(fas);
    iconLibrary.addIconPacks(far);
    iconLibrary.addIcons(...fontAwesomeIcons);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
