import { State } from "./state";
import { Diagnosis, HospitalEntry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "FILL_PATIENT_INFO",
      payload: Patient
    }
  | {
      type: "SET_DIAGNOSIS_LIST",
      payload: Diagnosis[]
    }
  | {
      type: "ADD_ENTRY",
      payload: HospitalEntry,
      patientId: string
    };

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const fillPatientInfo = (patient: Patient): Action => {
  return {
    type: "FILL_PATIENT_INFO",
    payload: patient
  };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisList
  };
};

export const addHospitalEntry = (entry: HospitalEntry, id: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: entry,
    patientId: id
  };
};

export const reducer = (state: State, action: Action): State => {
  console.log(action);
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "FILL_PATIENT_INFO":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose}),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "ADD_ENTRY":
      const updatedPatients = Object.assign({}, state.patients);
      if (updatedPatients[action.patientId].entries) {
        updatedPatients[action.patientId].entries?.push(action.payload);
      } else {
        updatedPatients[action.patientId].entries = [action.payload];
      }
      return {
        ...state,
        patients: updatedPatients
      };
    default:
      return state;
  }
};
