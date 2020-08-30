export class DataGroup {
    constructor(
        public id?: string,
        public name?: string,
        public demographicCount?: number,
        public specimenCount?: number,
        public totalTestedCount?: number,
        public totalBarcodeCount?: number,
        public modifiedDate?: number,
        public modifiedBy?: string,
        public createdDate?: number,
        public createdBy?: string,
        public status?: DataGroupStatus,
        public modifiedByUser?: string,
        public createdByUser?: string
    ) { }
}

export const enum DataGroupStatus {
    incomplete = 0,
    complete = 1
}
