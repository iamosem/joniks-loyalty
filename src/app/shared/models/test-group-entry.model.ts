export class TestGroupEntry {
    constructor(
        public id?: TestGroupEntryId,
        public barcodeSerial?: string,
        public assignedDate?: number,
        public comment?: string,
        public status?: TestGroupEntryStatus,
        public createdDate?: number,
        public createdBy?: string
    ) { }
}

export class TestGroupEntryId {
    constructor(
        public testGroupId?: number,
        public location?: string
    ) { }
}

export const enum TestGroupEntryStatus {
    notTested = -1,
    na = 0,
    negative = 1,
    positive = 2,
    equivocal = 3,
    pendingReRun = 4,
    pendingReExtraction = 5,
    pendingValidation = 6
}
