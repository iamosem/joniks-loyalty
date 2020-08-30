import { Route } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';
import { UserRouteAccessService } from '../core/auth/user-route-access-service';
import { UserResolve } from '../user/user.route';

export const changePasswordRoute: Route = {
    path: 'change-password/:id',
    resolve: {
        user: UserResolve
    },
    data: {
        pageTitle: 'global.title'
    },
    component: ChangePasswordComponent,
    canActivate: [UserRouteAccessService]
};
