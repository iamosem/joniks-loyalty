import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AccountService } from '../core/auth/account.service';
import { BaseComponent } from '../shared/helper/base-component';
import { objEmpty } from '../shared/helper/obj.util';
import { User } from '../shared/models/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent extends BaseComponent {
  isLoading = false;
  displayError = false;
  showPassword = false;

  errorInverval;

  user: User;
  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, Validators.required),
    repeatPassword: new FormControl(null, Validators.required)
  },
    {
      validators: this.passwordValidator.bind(this)
    });

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {
    super();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    super.ngOnInit();
    this.activatedRoute.data.subscribe(({ user }) => {
      if (objEmpty(user)) {
        this.router.navigate(['/accessdenied']);
      }
      this.user = user;
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    super.ngOnDestroy();
    this.clearIntervals();
  }

  clearIntervals() {
    if (this.errorInverval) {
      clearInterval(this.errorInverval);
    }
  }

  private getFromChangePasswordForm() {
    let formValues: any = {};

    const password = this.changePasswordForm.get(['password']).value;

    if (password) {
      formValues = { ...formValues, password };
    }

    return formValues;
  }

  save() {
    this.isLoading = true;
    this.displayError = false;
    this.clearIntervals();
    this.handleSubscription(
      this.userService.changePassword({ ...this.user, ...this.getFromChangePasswordForm() })
        .subscribe(
          () => this.onSuccessResponse(),
          (err: HttpErrorResponse) => this.onErrorResponse(err)
        )
    );
  }

  private onSuccessResponse() {
    this.accountService.logout()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(() => {
        this.accountService.authenticate(null);
        this.router.navigate(['login-page']);
      });
  }

  private onErrorResponse(err: HttpErrorResponse) {
    this.isLoading = false;
    this.displayError = true;
    this.errorInverval = setTimeout(() => this.displayError = false, 6000);
    console.error(err);
  }

  passwordValidator(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: passwordConfirmation } = formGroup.get('repeatPassword');
    return password === passwordConfirmation ? null : { passwordNotMatch: true };
  }

  back() {
    window.history.back();
  }
}
