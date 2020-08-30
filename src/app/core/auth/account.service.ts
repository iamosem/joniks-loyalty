import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { SERVER_API_URL, AUTHORITIES } from 'src/app/shared/constants';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: User;
  private authenticated = false;
  private authenticationState = new Subject<any>();
  private accountCache$: Observable<User>;

  constructor(
    private http: HttpClient
  ) { }

  logout(): Observable<any> {
    return this.http.post(SERVER_API_URL + '/user/logout', {}, { observe: 'response' });
  }

  fetch(): Observable<User> {
    return this.http.get<User>(SERVER_API_URL + '/user/info');
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
      this.accountCache$ = this.fetch().pipe(
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
