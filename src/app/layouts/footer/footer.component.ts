import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  urlBlacklist = ['/error', '/404', '/accessdenied', '/change-password'];

  constructor(private router: Router) { }

  isBlacklisted() {
    return this.urlBlacklist.some(b => this.router.url.startsWith(b));
  }
}
