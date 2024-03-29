import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { footerRoute } from './layouts/footer/footer.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { errorRoute } from './layouts/error/error.route';
import { UserRouteAccessService } from './core/auth/user-route-access-service';

const LAYOUT_ROUTES = [navbarRoute, footerRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'home',
        data: {
          pageTitle: 'global.title'
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'user',
        data: {
          pageTitle: 'global.title',
          authorities: ['ROLE_LAB', 'ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () =>
          import('./user/user.module').then(
            (m) => m.UserModule
          ),
      },
      ...LAYOUT_ROUTES,
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
