export type Diagnosis = {
    code: string,
    name: string,
    latin?: string
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  entries?: Entry[]
}

export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female'
}

export type Error = {
    message: string
};