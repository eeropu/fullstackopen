import express from 'express';
import { Diagnosis } from '../types';
import diagnosisService from './../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
    const result: Array<Diagnosis> = diagnosisService.getEntries();
    res.status(200).json(result);
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnosis');
});

export default router;