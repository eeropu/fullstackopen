export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string,
  date: string,
  specialist: string,
  description: string,
  diagnosisCodes?: Array<Diagnosis['code']>,
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge: {
      date: string,
      criteria: string
  }
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: {
      startDate: string,
      endDate: string
  }
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: 0 | 1 | 2 | 3,
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type newHospitalEntry = Omit<HospitalEntry, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
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
