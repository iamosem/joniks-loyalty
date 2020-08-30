import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/helper/base-component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent extends BaseComponent {
  breadcrumbs = [
    { label: 'user.list.title', url: '/user' },
    { label: 'user.add.title', url: '/user/add' },
  ];

  isLoading = false;
  showPassword = false;

  userForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    firstName: new FormControl(null, []),
    lastName: new FormControl(null, []),
    password: new FormControl(null, Validators.required),
    passwordConfirmation: new FormControl(null, Validators.required),
    roleId: new FormControl(null, Validators.required)
  },
    {
      validators: this.passwordValidator.bind(this)
    }
  );

  constructor(private userService: UserService, private router: Router, private modalService: NgbModal) {
    super();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    super.ngOnInit();
  }

  backToList() {
    this.router.navigate(['/user']);
  }

  private getFromUserForm() {
    let formValues: any = {};

    const username = this.userForm.get(['username']).value;
    const email = this.userForm.get(['email']).value;
    const firstName = this.userForm.get(['firstName']).value;
    const lastName = this.userForm.get(['lastName']).value;
    const password = this.userForm.get(['password']).value;
    const roleId = this.userForm.get(['roleId']).value;

    if (username) {
      formValues = { ...formValues, username };
    }
    if (email) {
      formValues = { ...formValues, email };
    }
    if (firstName) {
      formValues = { ...formValues, firstName };
    }
    if (lastName) {
      formValues = { ...formValues, lastName };
    }
    if (password) {
      formValues = { ...formValues, password };
    }
    if (roleId) {
      formValues = { ...formValues, roleId };
    }

    return formValues;
  }

  save() {
    this.isLoading = true;
    this.handleSubscription(
      this.userService.create(this.getFromUserForm())
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(
          () => this.onSuccessResponse(),
          (err: HttpErrorResponse) => this.onErrorResponse(err)
        )
    );
  }

  private onSuccessResponse() {
    this.router.navigate(['/user']);
  }

  private onErrorResponse(err: HttpErrorResponse) {
    console.error(err);
  }

  passwordValidator(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: passwordConfirmation } = formGroup.get('passwordConfirmation');
    return password === passwordConfirmation ? null : { passwordNotMatch: true };
  }
}
