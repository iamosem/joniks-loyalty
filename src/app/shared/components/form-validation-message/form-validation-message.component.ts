import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-validation-message',
  templateUrl: './form-validation-message.component.html',
  styleUrls: ['./form-validation-message.component.scss']
})
export class FormValidationMessageComponent {
  @Input() form = null;
  @Input() fieldName = null;
  @Input() validationParams = null;

  constructor() {}
}
