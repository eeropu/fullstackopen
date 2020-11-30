interface valuesForBMICalculator {
    height: number,
    weight: number
}

export const parseBmiArguments = (args: Array<string>): valuesForBMICalculator => {
    if ( args.length < 4) throw new Error('Not enough arguments');
    if ( args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (a: number, b: number): string => {
    const result = b / Math.pow(a / 100, 2);
    if (result < 15) {
        return "Very severely underweight";
    } else if (result < 16) {
        return "Severely underweight";
    } else if (result < 18.5) {
        return "Underweight";
    } else if (result < 25) {
        return "Normal (healthy weight)";
    } else if (result < 30) {
        return "Overweight";
    } else if (result < 35) {
        return "Moderately obese";
    } else if (result < 40) {
        return "Severely obese";
    } else {
        return "Very severely obese";
    }
};

try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(`With height ${height}cm and weight ${weight}kg, BMI is ${calculateBmi(height, weight)}`);
} catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error: ', e.message);
}