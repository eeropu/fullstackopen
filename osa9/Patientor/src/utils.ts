import { Gender, NewPatientEntry } from "./types";

export const toNewPatientEntry = (data: any): NewPatientEntry => {
    return {
        name: parseName(data.name),
        dateOfBirth: parseDate(data.dateOfBirth),
        ssn: parseSSN(data.ssn),
        gender: parseGender(data.gender),
        occupation: parseOccupation(data.occupation)
    };
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${name}`);
    }
    return name;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing date of birth: ${date}`);
    }
    return date;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: ${ssn}`)
    }
    return ssn
}

const parseGender = (gender: unknown): string => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`Ìncorrect or missing gender: ${gender}`)
    }
    return gender
}

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ${occupation}`)
    }
    return occupation
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param)
}

