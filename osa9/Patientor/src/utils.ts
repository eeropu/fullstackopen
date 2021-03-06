import { Entry, Gender, NewPatientEntry } from "./types";
type toNewPatientEntryParams = {
    name?: unknown,
    dateOfBirth?: unknown,
    ssn?: unknown,
    gender?: unknown,
    occupation?: unknown
};

export const toNewPatientEntry = (data: toNewPatientEntryParams): NewPatientEntry => {
    const entries: Array<Entry> = [];
    return {
        name: parseName(data.name),
        dateOfBirth: parseDate(data.dateOfBirth),
        ssn: parseSSN(data.ssn),
        gender: parseGender(data.gender),
        occupation: parseOccupation(data.occupation),
        entries
    };
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing ssn: ${ssn}`);
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Ìncorrect or missing gender: ${gender}`);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
    }
    return occupation;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

