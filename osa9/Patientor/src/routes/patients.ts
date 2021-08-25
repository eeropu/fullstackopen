import express from 'express';
import { NewPatientEntry, NonSensitivePatientData, Error, Patient, newEntry, Entry } from '../types';
import { toNewPatientEntry } from '../utils';
import patientService from './../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    const result: Array<NonSensitivePatientData> = patientService.getNonSensitiveEntries();
    res.status(200).json(result);
});

router.get('/:id', (req, res) => {
    const result = patientService.getPatientById(req.params.id) as Patient;
    if (result) {
        res.status(200).json({...result, entries: result.entries ? result.entries : []});
    } else {
        res.status(404);
    }
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation }: NewPatientEntry = req.body as NewPatientEntry;
    try {
        const newPatientEntry: NewPatientEntry = toNewPatientEntry({
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation
        });
        const addedPatientEntry = patientService.addEntry(newPatientEntry);
        res.status(200).json(addedPatientEntry);
    } catch (error) {
        const errorContent: Error = error as Error;
        res.status(400).json({ error: errorContent.message });
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const values: newEntry = req.body as newEntry;
        if (values.date && values.description && values.specialist && values.type) {
            switch (values.type) {
                case "HealthCheck":
                    if (!values.healthCheckRating) {
                        return res.status(400).json({ error: "missing healthCheckRating" });
                    }
                    break;
                case "Hospital":
                    if (!values.discharge) {
                        return res.status(400).json({ error: "missing discharge information"});
                    }
                    break;
                case "OccupationalHealthcare":
                    if (!values.employerName) {
                        return res.status(400).json({ error: "missing employer name" });
                    }
                    break;
                default:
                    return res.status(400).json({ error: "invalid entry type" });
            }
            const addedEntry: Entry = patientService.addMedicalEntry(values, req.params.id );
            return res.status(201).json(addedEntry);
        } else {
            return res.status(400).json({ error: "Missing some values" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "failed to add entry"});
    }
});

export default router;