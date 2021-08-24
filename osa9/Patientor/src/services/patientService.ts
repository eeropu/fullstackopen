import patientData from '../../data/patients.json';
import { NewPatientEntry, NonSensitivePatientData, Patient } from './../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): Array<Patient> => {
    return patientData;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientData> => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        };
    });
};

const getPatientById = (id: string): Patient | undefined => {
    return patientData.find(patient => patient.id === id);
};

const addEntry = (entry: NewPatientEntry): Patient => {
    const newPatient: Patient = { ...entry, id: uuidv4() };
    patientData.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry,
    getPatientById
};