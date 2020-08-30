import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SafePipe } from './pipes/safe.pipe';
import { NgxBarcodeModule } from 'ngx-barcode';
import { QrCodeModule } from 'ng-qrcode';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [
    SafePipe
  ],
  exports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    FontAwesomeModule,
    NgxBarcodeModule,
    QrCodeModule,
    SafePipe,
    MatProgressBarModule
  ]
})
export class SharedLibsModule { }
