import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/helper/base-component';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent extends BaseComponent {
  urlBlacklist = ['/home', '/home/passthrough'];

  @Input() breadcrumbs = [];

  constructor(private router: Router) {
    super();
  }

  get CurrentPage(): string {
    return this.breadcrumbs && this.breadcrumbs.length > 0
      ? this.breadcrumbs[this.breadcrumbs.length - 1].label
      : 'global.menu.home';
  }

  isBlacklisted() {
    return this.urlBlacklist.some((b) => this.router.url.startsWith(b));
  }
}
