import { TitleCasePipe } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/auth/account.service';
import { objEmpty } from 'src/app/shared/helper/obj.util';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.scss'],
  providers: [TitleCasePipe]
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  urlBlacklist = ['/error', '/404', '/accessdenied', '/change-password'];

  user: User;

  constructor(
    private elmRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private titleCasePipe: TitleCasePipe,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.user = this.accountService.getUserIdentity();
  }

  ngAfterViewChecked(): void {
    this.repositionActiveLinkIndicator();
  }

  @HostListener('window:resize')
  onResize() {
    this.repositionActiveLinkIndicator();
  }

  repositionActiveLinkIndicator() {
    const indicator = this.elmRef.nativeElement.querySelector('.app-nav .active-link-indicator');
    if (indicator) {
      this.renderer.setStyle(indicator, 'width', '0px');
      this.renderer.setStyle(indicator, 'visibility', 'hidden');
      const activeLink = this.elmRef.nativeElement.querySelector('.app-nav .list-inline .active-link');
      if (activeLink) {
        this.renderer.setStyle(indicator, 'visibility', 'visible');
        this.renderer.setStyle(indicator, 'left', `${activeLink.offsetLeft}px`);
        this.renderer.setStyle(indicator, 'width', `${activeLink.offsetWidth}px`);
      }
    }
  }

  isBlacklisted() {
    return this.urlBlacklist.some(b => this.router.url.startsWith(b));
  }

  get DisplayName() {
    if (this.user) {
      if (!(objEmpty(this.user.lastName) || objEmpty(this.user.firstName))) {
        return this.titleCasePipe.transform(`${this.user.lastName}, ${this.user.firstName}`);
      } else {
        return this.user.username;
      }
    }
    return '-';
  }

  changePassword() {
    this.router.navigate(['/change-password', this.user.id]);
  }

  logout() {
    this.accountService.logout().subscribe(() => {
      this.accountService.authenticate(null);
      this.router.navigate(['login-page']);
    });
  }
}
