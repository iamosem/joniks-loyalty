export class Patient {
    constructor(
        public id?: string,
        public barcodeSerial?: string,
        public type?: PatientType,
        public firstName?: string,
        public middleName?: string,
        public lastName?: string,
        public age?: number,
        public sex?: string,
        public birthDate?: number,
        public email?: string,
        public contactNumber?: string,
        public arrivalDate?: number,
        public flightDetails?: string,
        public accessionNo?: string,
        public laboratoryNo?: string,
        public collectionDate?: number,
        public modifiedDate?: number,
        public modifiedBy?: string,
        public createdDate?: number,
        public createdBy?: string,
        public specimenScanDate?: number,
        public specimenCollectionDate?: number,
        public paymentStatus?: PaymentStatus,
        public paymentAmount?: number,
        public paymentType?: PaymentType,
        public paymentDate?: number,
        public paidAmount?: number,
        public paymentReceipt?: string,
        public paymentRemarks?: string,
        public imported?: boolean,
        public modifiedByUser?: string,
        public createdByUser?: string,
        public specimenType?: SpecimenType,
        public specimenStatus?: SpecimenStatus,
        public specimenRemarks?: string,
        public testResultStatus?: number,
        public region?: string,
        public province?: string,
        public municipality?: string,
        public barangay?: string,
        public street?: string,
        public civilStatus?: CivilStatus,
        public homePhoneNo?: string,
        public houseNo?: string,
        public curHouseNo?: string,
        public curStreet?: string,
        public curBarangay?: string,
        public curMunicipality?: string,
        public curProvince?: string,
        public curRegion?: string,
        public curHomePhoneNo?: string,
        public curMobileNumber?: string,
        public alternateEmail?: string,
        public employerName?: string,
        public occupation?: string,
        public placeOfWork?: string,
        public wrkHouseNo?: string,
        public wrkStreetAddress?: string,
        public wrkMunicipality?: string,
        public wrkProvince?: string,
        public wrkCountry?: string,
        public wrkPhoneNo?: string,
        public wrkMobileNumber?: string,
        public travelHistory?: number,
        public portOfExit?: string,
        public vessel?: string,
        public departureDate?: number,
        public exposureHistory?: ExposureHistory,
        public exposureDate?: number,
        public exposedToPlace?: ExposurePlace,
        public exposedToPlaceType?: ExposurePlaceType,
        public exposedToPlaceTypeOthers?: string,
        public exposedToPlaceDate?: number,
        public exposedToPlaceName?: string,
        public exposedToPlaceContact1Name?: string,
        public exposedToPlaceContact1Number?: string,
        public exposedToPlaceContact2Name?: string,
        public exposedToPlaceContact2Number?: string,
        public exposedToPlaceContact3Name?: string,
        public exposedToPlaceContact4Number?: string,
        public passportNo?: string,
        public nationality?: string,
        public philHealthNo?: string
    ) { }
}

export const enum PatientType {
    outPatient = 1,
    owwa = 2,
    others = 3
}

export const enum Sex {
    male = 'M',
    female = 'F'
}

export const enum PaymentStatus {
    unpaid = 0,
    withBalance = 1,
    paid = 2
}

export const enum PaymentType {
    cash = 0,
    credit = 1,
    check = 2
}

export const enum SpecimenType {
    opsAndNps = 0,
    nps = 1,
    ops = 2,
    serum = 3,
    eta = 4,
    ta = 5,
    sputum = 6,
    stool = 7,
    blood = 8,
    environmentalSample = 9,
    ngt = 10,
    etaSwabInVtmUtm =  11,
    other = 12
}

export const enum SpecimenStatus {
    testing = 0,
    discarded = 1,
    stored = 2
}

export const enum CivilStatus {
    single = 1,
    married = 2,
    widowed = 3,
    anulled = 4,
    divorced = 5,
    legallySeparated = 6
}

export const enum ExposureHistory {
    no = 0,
    yes = 1,
    unknown = 2
}

export const enum ExposurePlace {
    no = 0,
    yes = 1,
    unknown = 2
}

export const enum ExposurePlaceType {
    workplace = 1,
    socialGathering = 2,
    healthFacility = 3,
    religiousGathering = 4,
    others = 5
}
