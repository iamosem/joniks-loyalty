import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StateStorageService } from '../auth/state-storage.service';
import { AccountService } from '../auth/account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private storageService: StateStorageService,
    private accountService: AccountService
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storageService.getSessionToken();
    const clonedRequest = request.clone(
      {
        headers: token ? request.headers.set('SESSION_TOKEN', token) : request.headers,
        withCredentials: true
      }
    );
    return next.handle(clonedRequest ? clonedRequest : request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && !event.url.includes('asset')) {
            const arr = event.headers.keys();
            let sessionToken = null;
            arr.forEach(entry => {
              if (entry.toLowerCase().endsWith('session_token')) {
                sessionToken = event.headers.get(entry);
              }
            });
            if (sessionToken) {
              if (typeof sessionToken === 'string') {
                this.storageService.storeSessionToken(sessionToken);
              }
            }
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (
              err.status === 401 &&
              err.url
            ) {
              this.storageService.storeUrl(this.router.routerState.snapshot.url);
              this.storageService.removeSessionToken();
              this.accountService.authenticate(null);
              if (err.url.includes('user/info')) {
                this.router.navigateByUrl('login-page');
              } else {
                this.router.navigateByUrl('accessdenied');
              }
            }
          }
        }
      )
    );
  }
}
