import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ErrorComponent } from './layouts/error/error.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { IndexModule } from './index/index.module';
import { LoginModule } from './login/login.module';
import { ChangePasswordModule } from './change-password/change-password.module';

@NgModule({
  declarations: [MainComponent, NavbarComponent, FooterComponent, ErrorComponent],
  imports: [BrowserModule, CoreModule, SharedModule, IndexModule, LoginModule, ChangePasswordModule, AppRoutingModule],
  providers: [],
  bootstrap: [MainComponent],
})
export class AppModule { }
