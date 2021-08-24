import express from 'express';
import { NewPatientEntry, NonSensitivePatientData, Error, Patient } from '../types';
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

export default router;