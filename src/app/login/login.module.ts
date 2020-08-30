import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { loginRoute } from './login.route';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, RouterModule.forRoot([loginRoute])],
  declarations: [LoginComponent],
})
export class LoginModule { }
