import patientData from '../../data/patients';
import { newEntry, NewPatientEntry, NonSensitivePatientData, Patient, Entry } from './../types';
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

const addMedicalEntry = (entry: newEntry, id: string): Entry => {
    const newEntry: Entry = { ...entry, id: uuidv4() };
    const patient = patientData.find(patient => patient.id === id);
    if (!patient) {
        throw "Patient with given id not found";
    } else if (!patient.entries) {
        patient.entries = [ newEntry ];
    } else {
        patient.entries.push(newEntry);
    }
    return newEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry,
    getPatientById,
    addMedicalEntry
};