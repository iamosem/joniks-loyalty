import { Route } from '@angular/router';
import { LoginComponent } from './login.component';
import { UserRouteAccessService } from '../core/auth/user-route-access-service';

export const loginRoute: Route = {
    path: 'login-page',
    data: {
        pageTitle: 'global.title'
    },
    component: LoginComponent
};
