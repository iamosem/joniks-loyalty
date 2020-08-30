export class TestGroup {
    constructor(
        public id?: string,
        public barcodeSerial?: string,
        public name?: string,
        public status?: TestGroupStatus,
        public wellsCount?: number,
        public type?: TestGroupType,
        public modifiedDate?: number,
        public modifiedBy?: string,
        public createdDate?: number,
        public createdBy?: string,
        public duplicateFrom?: string,
        public modifiedByUser?: string,
        public createdByUser?: string,
        public comment?: string
    ) { }
}

export const enum TestGroupType {
    extraction = 0,
    test = 1
}

export const enum TestGroupStatus {
    new = 0,
    ongoing = 1,
    finished = 2
}
