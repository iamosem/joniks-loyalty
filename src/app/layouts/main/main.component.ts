import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/core/auth/account.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Account } from 'src/app/shared/models/account.model';
import { StateStorageService } from 'src/app/core/auth/state-storage.service';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  _cleanup: Subject<any> = new Subject<any>();

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private stateStorageService: StateStorageService,
    private accountService: AccountService,
    private authService: SocialAuthService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit(): void {
    this.subscribeToFbAuthEvents();
    this.subscribeToLoginEvents();
  }

  ngOnDestroy(): void {
    this._cleanup.next();
    this._cleanup.complete();
  }

  private subscribeToLoginEvents() {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this._cleanup))
      .subscribe((account: Account) => {
        if (account) {
          this.navigateToStoredUrl();
        }
      });
  }

  private subscribeToFbAuthEvents() {
    this.authService.authState.subscribe((user) => {
      console.error('@@@ loggedin: ', user);
    });
  }

  private navigateToStoredUrl() {
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.storeUrl(null);
      this.router.navigateByUrl(previousUrl);
    }
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }
}
