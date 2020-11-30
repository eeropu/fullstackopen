import { parseBmiArguments, calculateBmi } from './bmiCalculator';
import { parseExerciseCalculatorArguments, calculateExercises } from './exerciseCalculator';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height?.toString();
    const weight = req.query.weight?.toString();

    if (!height || !weight) {
        return res.status(400).json({ error: 'Height and weight are required as query parameters!'});
    }

    try {
        const parsed = parseBmiArguments(['', '', height, weight]);
        const result = calculateBmi(parsed.height, parsed.weight);
        return res.status(200).json({ ...parsed, bmi: result});
    } catch (e) {
        // eslint-disable-next-line
        const error: string = e.message;
        return res.status(400).json({ error });
    }
});

interface ExerciseData {
  target: string,
  days: Array<string>
}

app.post('/exercises', (req, res) => {
  const body = req.body as ExerciseData;
  if (!body.target || !body.days) {
    return res.status(400).json({ error: 'request must include fields "target" and "days"!' });
  }

  try {
    const { target, days } = parseExerciseCalculatorArguments(['', '', body.target, ...body.days]);
    const results = calculateExercises({ target, days });
    return res.status(200).json(results);
  } catch (e) {
    // eslint-disable-next-line
    return res.status(400).json({ error: e.message});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});