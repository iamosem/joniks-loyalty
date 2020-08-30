export class User {
    constructor(
        public id?: string,
        public username?: string,
        public email?: string,
        public firstName?: string,
        public lastName?: string,
        public password?: string,
        public roleId?: Role,
        public modifiedDate?: number,
        public modifiedBy?: string,
        public createdDate?: number,
        public createdBy?: string,
        public modifiedByUser?: string,
        public createdByUser?: string
    ) { }
}

export const enum Role {
    encoder = 0,
    lab = 1,
    admin = 2,
}
