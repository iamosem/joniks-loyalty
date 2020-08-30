import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { CookieService } from 'ngx-cookie';

@Injectable({ providedIn: 'root' })
export class StateStorageService {
  constructor(
    private $sessionStorage: SessionStorageService,
    private $cookieService: CookieService
  ) { }

  storeSessionToken(token: string) {
    this.$sessionStorage.store('SESSION_TOKEN', token);
  }

  removeSessionToken() {
    this.$sessionStorage.clear('SESSION_TOKEN');
  }

  getSessionToken() {
    return this.$sessionStorage.retrieve('SESSION_TOKEN');
  }

  storeUrl(url: string) {
    this.$sessionStorage.store('previous_url', url);
  }

  getUrl() {
    return this.$sessionStorage.retrieve('previous_url');
  }
}
