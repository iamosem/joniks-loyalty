import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/helper/base-component';
import { objEmpty } from 'src/app/shared/helper/obj.util';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent extends BaseComponent {
  breadcrumbs = [
    { label: 'user.list.title', url: '/user' },
    { label: 'user.edit.title' },
  ];

  isLoading = false;
  isSaving = false;

  user: User;
  userForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    firstName: new FormControl(null, []),
    lastName: new FormControl(null, []),
    roleId: new FormControl(null, Validators.required)
  });

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    super();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    super.ngOnInit();
    this.activatedRoute.data.subscribe(({ user }) => {
      if (objEmpty(user)) {
        this.router.navigate(['/user']);
      }
      this.user = user;
      this.patchFromUserForm();
    });
  }

  get DisplayModifiedDetails() {
    return this.user.modifiedDate || this.user.modifiedByUser;
  }

  get PageLoading() {
    return this.isLoading || this.isSaving;
  }

  backToList() {
    this.router.navigate(['/user']);
  }

  private patchFromUserForm() {
    this.userForm.patchValue({ ...this.user });
  }

  private getFromUserForm() {
    let formValues: any = {};

    const username = this.userForm.get(['username']).value;
    const email = this.userForm.get(['email']).value;
    const firstName = this.userForm.get(['firstName']).value;
    const lastName = this.userForm.get(['lastName']).value;
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
    if (roleId) {
      formValues = { ...formValues, roleId };
    }

    return formValues;
  }

  get FormUntouched() {
    const formValues = this.getFromUserForm();
    return !Object.keys(formValues).some(k => this.user[k] !== formValues[k]);
  }

  save() {
    this.isSaving = true;
    this.user.password = '';
    this.handleSubscription(
      this.userService.update({ ...this.user, ...this.getFromUserForm() })
        .pipe(finalize(() => (this.isSaving = false)))
        .subscribe(
          () => this.onSuccessResponse(),
          (err: HttpErrorResponse) => this.onErrorResponse(err)
        )
    );
  }

  private onSuccessResponse() {
    this.router
      .navigateByUrl(`/home/passthrough`, { skipLocationChange: true })
      .then(() => this.router.navigate(['/user', 'edit', this.user.id]));
  }

  private onErrorResponse(err: HttpErrorResponse) {
    console.error(err);
  }
}
