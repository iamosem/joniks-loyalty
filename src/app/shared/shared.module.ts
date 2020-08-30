import { NgModule } from '@angular/core';
import { CommonComponentsModule } from './components/common-components.module';
import { SharedLibsModule } from './shared-libs.module';
import { TranslateModule } from '@ngx-translate/core';
import { HasAnyAuthorityDirective } from '../core/auth/has-any-authoritiy.directive';
import { DisableControlDirective } from './directives/disable-control.directive';
import { IntellisenseDirective } from './directives/intellisense.directive';

@NgModule({
  imports: [SharedLibsModule, CommonComponentsModule, TranslateModule],
  declarations: [
    HasAnyAuthorityDirective,
    DisableControlDirective,
    IntellisenseDirective
  ],
  exports: [
    SharedLibsModule,
    CommonComponentsModule,
    TranslateModule,
    HasAnyAuthorityDirective,
    DisableControlDirective,
    IntellisenseDirective
  ]
})
export class SharedModule { }
