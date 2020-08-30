import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { PAGINATION_PAGE_SIZE_DEFAULT } from 'src/app/shared/constants';
import { BaseComponent } from 'src/app/shared/helper/base-component';
import { DataGroup } from 'src/app/shared/models/data-group.model';
import { User } from 'src/app/shared/models/user.model';
import { EventManagerService } from 'src/app/shared/services/event-manager.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent extends BaseComponent {
  breadcrumbs = [{ label: 'user.list.title', url: '/user' }];

  searchForm: FormGroup = new FormGroup({
    username: new FormControl(null),
    email: new FormControl(null)
  });

  isLoading = false;
  isSearching = false;
  isDeleting = false;

  userList = null as User[];
  columnDef = [
    {
      label: 'user.list.field.username',
      field: 'username',
      type: 'link',
      link: 'edit',
      linkParam: 'id'
    },
    {
      label: 'user.list.field.email',
      field: 'email'
    },
    {
      label: 'user.list.field.name',
      type: 'template',
      template: 'nameTemplate'
    },
    {
      label: 'user.list.field.role',
      field: 'roleId',
      type: 'collection',
      collection: 'role'
    },
    {
      label: 'user.list.field.createdDate',
      field: 'createdDate',
      type: 'date',
      date: 'short'
    },
    {
      label: 'user.list.field.createdBy',
      field: 'createdByUser'
    },
  ];

  columnActions = [
    {
      fn: 'deactivateUser',
      icon: 'user-slash',
      label: 'user.list.action.deactivateUser'
    }
  ];

  collection = {
    role: {
      0: 'user.list.role.encoder',
      1: 'user.list.role.lab',
      2: 'user.list.role.admin'
    }
  };

  itemsPerPage;
  page;
  totalItems;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private modalService: NgbModal,
    private userService: UserService,
    private eventManagerService: EventManagerService
  ) {
    super();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    super.ngOnInit();
    this.initPagination();
    this.loadAll(true);

    this.handleSubscription(
      this.eventManagerService.subscribe(
        'user-list',
        () => {
          this.loadPage({ page: 0, size: this.itemsPerPage });
        }
      )
    );
  }

  get PageLoading() {
    return this.isLoading || this.isDeleting || this.isSearching;
  }

  private initPagination() {
    this.itemsPerPage = PAGINATION_PAGE_SIZE_DEFAULT;
    this.page = 0;
    this.totalItems = 0;
  }

  get TotalPages() {
    let totalPages = Math.floor(this.totalItems / this.itemsPerPage);
    if (this.totalItems % this.itemsPerPage > 0) {
      totalPages++;
    }
    return totalPages;
  }

  private loadAll(reset = false) {
    this.isLoading = true;
    const query = { page: this.page, size: this.itemsPerPage, ...this.getFromSearchForm() };
    this.handleSubscription(
      this.userService
        .query(query)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(
          (res: any) => this.paginateUser(res.body, res.headers, reset),
          (res: HttpErrorResponse) => this.onError(res.message, reset)
        )
    );
  }

  reset() {
    this.page = 0;
    this.loadAll(true);
  }

  loadPage({ page, size }) {
    this.page = page;
    this.itemsPerPage = size;
    this.loadAll(true);
  }

  private paginateUser(data: DataGroup[], headers: HttpHeaders, reset = false) {
    if (reset) {
      this.userList = [];
    }
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++) {
      this.userList = this.userList ? [...this.userList, data[i]] : [data[i]];
    }
  }

  private onError(errorMessage: string, reset = false) {
    console.error(errorMessage);
    if (reset) {
      this.reset();
    }
  }

  addUser() {
    this.router.navigate(['add']);
  }

  action(evt) {
    this[evt.fn](evt.row);
  }

  deactivateUser(row) {
    this.router.navigate(['/user', { outlets: { popup: `delete/${row.id}` } }]);
  }

  private getFromSearchForm() {
    let formValues: any = {};
    const username = this.searchForm.get(['username']).value;
    const email = this.searchForm.get(['email']).value;
    if (username) {
      formValues = { ...formValues, username };
    }
    if (email) {
      formValues = { ...formValues, email };
    }
    return formValues;
  }

  search() {
    this.isSearching = true;
    this.page = 0;
    this.userList = [];
    const query = { page: this.page, size: this.itemsPerPage, ...this.getFromSearchForm() };
    this.handleSubscription(
      this.userService
        .query(query)
        .pipe(finalize(() => (this.isSearching = false)))
        .subscribe(
          (res: any) => this.paginateUser(res.body, res.headers),
          (res: HttpErrorResponse) => this.onError(res.message)
        )
    );
  }
}
