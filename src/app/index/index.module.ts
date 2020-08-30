import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { INDEX_ROUTE } from './index.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([INDEX_ROUTE])]
})
export class IndexModule { }
