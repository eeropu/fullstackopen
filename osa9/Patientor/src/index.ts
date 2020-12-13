import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());


app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.status(200).send('pong');
});

import diagnosisRouter from './routes/diagnoses';
app.use('/api/diagnoses', diagnosisRouter);

import patientRouter from './routes/patients';
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});