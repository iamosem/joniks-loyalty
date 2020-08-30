import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../core/auth/account.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router, private accountService: AccountService, private sessionStorage: SessionStorageService) {
    this.routeToDefaultPages();
  }

  private routeToDefaultPages() {
    if (!this.router.url.includes('passthrough')) {
      if (this.accountService.hasAnyAuthority(['ROLE_ENCODER', 'ROLE_ADMIN', 'ROLE_LAB'])) {
        this.router.navigate(['/data-group']);
      } else if (this.accountService.hasAnyAuthority('ROLE_ENCODER')) {
        this.router.navigate(['/patient']);
      }
    }
  }
}
