export const objEmpty = (obj: any) => {
    if (!obj) {
        return true;
    } else if (obj.constructor.name !== 'Array') {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return JSON.stringify(obj) === JSON.stringify({});
    } else if (obj.constructor.name === 'Array') {
        return obj === null || obj === undefined || obj.length === 0;
    }
};

export const formatAsName = (firstName?: string, middleName?: string, lastName?: string) => {
    let name = '';
    if (lastName) {
        name += lastName;
    }
    if (firstName || middleName) {
        name += ',';
        if (firstName) {
            name += ` ${firstName}`;
        }
        if (middleName) {
            name += ` ${middleName}`;
        }
    }
    return name;
};


export const indexOfObj = (array, attr, value) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i][attr].toLowerCase() === value.toLowerCase()) {
            return i;
        }
    }
    return -1;
};
