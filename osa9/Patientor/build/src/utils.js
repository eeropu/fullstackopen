"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const toNewPatientEntry = (data) => {
    const entries = [];
    return {
        name: parseName(data.name),
        dateOfBirth: parseDate(data.dateOfBirth),
        ssn: parseSSN(data.ssn),
        gender: parseGender(data.gender),
        occupation: parseOccupation(data.occupation),
        entries
    };
};
exports.toNewPatientEntry = toNewPatientEntry;
const parseName = (name) => {
    if (!name || !isString(name)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing name: ${name}`);
    }
    return name;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing date of birth: ${date}`);
    }
    return date;
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing ssn: ${ssn}`);
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Ìncorrect or missing gender: ${gender}`);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
    }
    return occupation;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
