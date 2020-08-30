import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../shared/helper/base-component';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, finalize } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import { UserService } from '../user/user.service';
import { SocialAuthService, FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent {
  isLoading = false;
  displayError = false;

  errorInverval;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private translateService: TranslateService,
    private authService: SocialAuthService
  ) {
    super();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.clearIntervals();
  }

  clearIntervals() {
    if (this.errorInverval) {
      clearInterval(this.errorInverval);
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  login() {
    this.isLoading = true;
    this.displayError = false;
    this.clearIntervals();
    this.userService.authenticate(this.loginForm.get(['username']).value, this.loginForm.get(['password']).value)
      .pipe(map(({ body }) => body))
      .subscribe((user: User) => {
        if (user) {
          this.router.navigate(['/']);
        } else {
          this.isLoading = false;
          this.displayError = true;
          this.errorInverval = setTimeout(() => this.displayError = false, 6000);
        }
      });
  }

  get Copyright() {
    return this.translateService.instant('global.copyright');
  }
}
