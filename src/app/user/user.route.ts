import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRouteAccessService } from '../core/auth/user-route-access-service';
import { DataGroup } from '../shared/models/data-group.model';
import { User } from '../shared/models/user.model';
import { UserDeactivatePopupComponent } from './deactivate/user-deactivate-dialog.component';
import { UserListComponent } from './list/user-list.component';
import { UserService } from './user.service';
import { UserAddComponent } from './add/user-add.component';
import { UserEditComponent } from './edit/user-edit.component';

@Injectable({ providedIn: 'root' })
export class UserResolve implements Resolve<User> {
  constructor(private service: UserService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<DataGroup> {
    const id = route.params.id;
    if (id) {
      return this.service.find(id).pipe(map((user: HttpResponse<User>) => user.body));
    }
    return of(null);
  }
}

export const userRoutes: Route[] = [
  {
    path: '',
    data: {
      authorities: ['ROLE_ADMIN'],
      breadcrumb: 'global.menu.user',
    },
    component: UserListComponent,
  },
  {
    path: 'add',
    data: {
      authorities: ['ROLE_ADMIN'],
      breadcrumb: 'global.menu.user',
    },
    component: UserAddComponent,
  },
  {
    path: 'edit/:id',
    resolve: {
      user: UserResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      breadcrumb: 'global.menu.user',
    },
    component: UserEditComponent,
  }
];

export const userPopupRoute: Route = {
  path: 'delete/:id',
  component: UserDeactivatePopupComponent,
  resolve: {
    user: UserResolve
  },
  data: {
    authorities: ['ROLE_ADMIN'],
    pageTitle: 'global.menu.dataGroup',
  },
  canActivate: [UserRouteAccessService],
  outlet: 'popup'
};
