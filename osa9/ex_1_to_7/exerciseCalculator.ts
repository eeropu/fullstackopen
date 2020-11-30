interface parsedArguments {
    target: number,
    days: Array<number>
}

export const parseExerciseCalculatorArguments = (args: Array<string>): parsedArguments => {
    if (args.length < 4) throw new Error('Not enough arguments!');
    if (args.slice(2).some(input => isNaN(Number(input)) || Number(input) < 0)) throw new Error('All values need to be non-negative numbers');

    return {
        target: Number(args[2]),
        days: args.slice(3).map(d => Number(d))
    };
};

interface Result {
    numOfDays: number,
    numOfTrainingDays: number,
    target: number,
    averageTime: number,
    targetReached: boolean,
    rating: 1|2|3,
    ratingExplanation: string
}

export const calculateExercises = ({ target, days }: parsedArguments): Result => {
    const numOfDays = days.length;
    const numOfTrainingDays = days.filter(hours => Number(hours) > 0).length;
    const averageTime = days.reduce((sum, next) => sum + next, 0) / numOfDays;
    const targetReached = averageTime >= target;
    const rating = targetReached ? 3 : averageTime >= target * 0.7 ? 2 : 1;
    const ratingExplanation = explainRating(rating);

    return {
        numOfDays,
        numOfTrainingDays,
        target,
        averageTime,
        targetReached,
        rating,
        ratingExplanation
    };
};

const explainRating = (rating: number): string => {
    switch (rating) {
        case 3:
            return "You reached your target, well done!";
        case 2:
            return "You didn't quite reach your target, but you're not far behind";
        case 1:
            return "You fell behind your target more than 30%, time to shape up!";
        default:
            return `incorrect rating value: ${rating}`;
    }
};

const printResults = (results: Result) => {
    console.log(results);
};

try {
    const args = parseExerciseCalculatorArguments(process.argv);
    const results = calculateExercises(args);
    printResults(results);
} catch (e) {
    // eslint-disable-next-line
    console.log(`Error: ${e.message}`);
}