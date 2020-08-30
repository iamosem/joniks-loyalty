import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { Observable, Subject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { AUTHORITIES, SERVER_API_URL } from 'src/app/shared/constants';
import { User } from 'src/app/shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: User;
  private authenticated = false;
  private authenticationState = new Subject<any>();
  private accountCache$: Observable<User>;

  private fbIdentity: SocialUser;

  constructor(
    private http: HttpClient
  ) { }

  logout(): Observable<any> {
    return this.http.post(SERVER_API_URL + '/user/logout', {}, { observe: 'response' });
  }

  fetch(): Observable<User> {
    return this.http.get<User>(SERVER_API_URL + '/user/info');
  }

  fetchFb(user: SocialUser): Observable<User> {
    return this.http.post<User>(SERVER_API_URL + '/user/fb/info', user);
  }

  authenticate(identity) {
    this.userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (
      !this.authenticated ||
      !this.userIdentity
    ) {
      return false;
    }

    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }

    return authorities.some((authority: string) => AUTHORITIES[authority] === this.userIdentity.roleId);
  }

  identity(force?: boolean): Observable<User> {
    if (force || !this.authenticated) {
      this.accountCache$ = null;
    }

    if (!this.accountCache$) {
      let service;
      if (this.fbIdentity) {
        service = this.fetchFb(this.fbIdentity);
      } else {
        service = this.fetch();
      }
      this.accountCache$ = service.pipe(
        tap((account) => {
          if (account) {
            this.userIdentity = account;
            this.authenticated = true;
          } else {
            this.userIdentity = null;
            this.authenticated = false;
          }
          this.authenticationState.next(this.userIdentity);
        }),
        shareReplay()
      );
    }
    return this.accountCache$;
  }

  authenticateFb(user: SocialUser) {
      this.fbIdentity = user;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  isIdentityResolved(): boolean {
    return this.userIdentity !== undefined;
  }

  getUserIdentity(): User {
    return this.userIdentity;
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }
}
