import express from 'express';
import { NewPatientEntry, NonSensitivePatientData } from '../types';
import { toNewPatientEntry } from '../utils'
import patientService from './../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    const result: Array<NonSensitivePatientData> = patientService.getNonSensitiveEntries();
    res.status(200).json(result);
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation }: NewPatientEntry = req.body;
    try {
        const newPatientEntry = toNewPatientEntry({
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation
        })
        const addedPatientEntry = patientService.addEntry(newPatientEntry);
        res.status(200).json(addedPatientEntry);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

export default router;