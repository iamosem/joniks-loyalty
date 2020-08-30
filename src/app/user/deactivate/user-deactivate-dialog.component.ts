import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventManagerService } from 'src/app/shared/services/event-manager.service';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';


@Component({
  selector: 'app-user-deactivate-dialog',
  templateUrl: './user-deactivate-dialog.component.html'
})
export class UserDeactivateDialogComponent {
  user: User;
  errorMessage: string;

  isLoading = false;

  constructor(
    public activeModal: NgbActiveModal,
    protected userService: UserService,
    private eventManagerService: EventManagerService
  ) { }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDeactivate() {
    this.isLoading = true;
    this.userService.delete(this.user.id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => {
          this.eventManagerService.broadcast('user-list', 'list updated');
          this.activeModal.close();
        },
        (err: HttpErrorResponse) => {
          this.onErrorResponse(err);
        }
      );
  }

  onErrorResponse(err: HttpErrorResponse) {
    console.error(err);
    this.errorMessage = err.message;
    setTimeout(() => this.errorMessage = null, 4000);
  }
}

@Component({
  selector: 'app-user-deactivate-popup',
  template: ''
})
export class UserDeactivatePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ user }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UserDeactivateDialogComponent as Component, {
          size: 'sm',
          backdrop: true
        });
        this.ngbModalRef.componentInstance.user = user;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/user', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/user', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
