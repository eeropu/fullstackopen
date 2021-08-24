"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_json_1.default;
};
const getNonSensitiveEntries = () => {
    return patients_json_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        };
    });
};
const getPatientById = (id) => {
    return patients_json_1.default.find(patient => patient.id === id);
};
const addEntry = (entry) => {
    const newPatient = Object.assign(Object.assign({}, entry), { id: uuid_1.v4() });
    patients_json_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addEntry,
    getPatientById
};
