import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Patient } from 'src/app/shared/models/patient.model';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html'
})
export class NotificationDialogComponent {
  message: string;
  type: string;
  time: any;
  template: string;
  obj: any;

  patientInfo: Patient;

  countdown = 6000;
  interval;

  isLoading = false;

  constructor(public activeModal: NgbActiveModal) {
    setTimeout(() => this.initiateStart()); // let setting of fields finish
  }

  private initiateStart() {
    if (this.time && !isNaN(this.time)) {
      this.countdown = (+this.time) * 1000;
    }
    if (this.template === 'patient-info') {
      this.parsePatientInfo();
    }
    this.runTimer();
  }

  private parsePatientInfo() {
    if (this.obj) {
      this.patientInfo = JSON.parse(this.obj);
    }
  }

  close() {
    clearInterval(this.interval);
    this.activeModal.dismiss('cancel');
  }

  private runTimer() {
    this.interval = setInterval(() => {
      this.countdown -= 10;
      if (this.countdown === 0) {
        this.close();
      } else if (this.countdown === 3000) {
        this.isLoading = true;
      }
    }, 10);
  }
}

