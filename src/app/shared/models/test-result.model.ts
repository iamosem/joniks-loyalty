export class TestResult {
    constructor(
        public id?: TestResultPK,
        public comment?: string,
        public result?: TestResultStatus,
        public createdDate?: number,
        public createdBy?: string,
        public testGroupName?: string,
        public testGroupStatus?: number
    ) { }
}

export class TestResultPK {
    constructor(
        public testGroupId?: number,
        public barcodeSerial?: string,
        public location?: string
    ) { }
}

export const enum TestResultStatus {
    notTested = -1,
    na = 0,
    negative = 1,
    positive = 2,
    equivocal = 3,
    pendingReRun = 4,
    pendingReExtraction = 5,
    pendingValidation = 6
}
