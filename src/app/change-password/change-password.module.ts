import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { changePasswordRoute } from './change-password.route';
import { ChangePasswordComponent } from './change-password.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, RouterModule.forRoot([changePasswordRoute])],
  declarations: [ChangePasswordComponent],
})
export class ChangePasswordModule { }
