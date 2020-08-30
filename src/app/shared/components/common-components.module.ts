import { NgModule } from '@angular/core';
import { SharedLibsModule } from '../shared-libs.module';
import { FormValidationMessageComponent } from './form-validation-message/form-validation-message.component';
import { LoaderComponent } from './loader/loader.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DatatableComponent } from './datatable/datatable.component';

@NgModule({
  imports: [SharedLibsModule],
  declarations: [
    FormValidationMessageComponent,
    LoaderComponent,
    BreadcrumbsComponent,
    DatatableComponent,
    PaginationComponent
  ],
  exports: [
    SharedLibsModule,
    FormValidationMessageComponent,
    LoaderComponent,
    BreadcrumbsComponent,
    DatatableComponent,
    PaginationComponent
  ]
})
export class CommonComponentsModule { }
