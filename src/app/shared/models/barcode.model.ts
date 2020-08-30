import { Patient } from './patient.model';

export class Barcode {
    constructor(
        public id?: string,
        public barcodeNumber?: string,
        public status?: BarcodeStatus,
        public remarks?: string,
        public dataGroupId?: string,
        public specimenScanDate?: number,
        public demographicScanDate?: number,
        public modifiedDate?: number,
        public modifiedBy?: string,
        public createdDate?: number,
        public createdBy?: string,
        public barcodeSerial?: string,
        public modifiedByUser?: string,
        public createdByUser?: string,
        public testResultStatus?: number,
        public patient?: Patient
    ) { }
}

export const enum BarcodeStatus {
    testing = 0,
    discarded = 1,
    stored = 2
}
