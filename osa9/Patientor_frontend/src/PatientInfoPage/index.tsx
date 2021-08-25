import React, { useEffect } from "react";
import { addHospitalEntry, fillPatientInfo, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Entry, HospitalEntry, newHospitalEntry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Icon } from "semantic-ui-react";
import AddEntryForm, { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientInfoPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{id: string}>();

    const patient = patients[id];

    useEffect(() => {

        const fetchPatientsFullInfo = async () => {
            try {
                const { data: fullPatientInfo } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(fillPatientInfo(fullPatientInfo));
            } catch (error) {
                console.log(error);
            }
        };
        if (!patient?.ssn) {
            void fetchPatientsFullInfo();
        }
    }, [dispatch]);

    const onSubmit = async (values: EntryFormValues) => {
        const discharge = {
            date: values.dischargeDate,
            criteria: values.dischargeCriteria
        };

        const formatted: newHospitalEntry = {
            type: "Hospital",
            date: values.date,
            specialist: values.specialist,
            description: values.description,
            diagnosisCodes: values.diagnosisCodes,
            discharge
        };

        const newEntry = await axios.post<HospitalEntry>(`${apiBaseUrl}/patients/${id}/entries`, formatted);

        dispatch(addHospitalEntry(newEntry.data, id));
    };

    return (
        <div>
            <h1>Patient information</h1>
            <h2>{patient.name}</h2>
            <p>gender: {patient.gender}</p>
            <p>date of birth: {patient.dateOfBirth}</p>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <Entries entries={patient.entries}/>
            <h3>Add Entry</h3>
            <AddEntryForm onSubmit={onSubmit} onCancel={() => console.log("ei pöö")}/>
        </div>
    );
};

const Entries: React.FC<{entries: Entry[] | undefined}> = ({ entries }) => {

    const [{ diagnosis }] = useStateValue();

    const entryStyle = {
        border: "1px solid black",
        marginBottom: "5px"
    };

    const content = entries ? entries.map(entry => {

        const assertNever = (entry: Entry) => {
            console.error(`Invalid entry type: ${entry.type}`);
        };

        let icon = undefined;

        switch (entry.type) {
            case "Hospital":
                icon = <Icon name='hospital outline'/>;
                break;
            case "OccupationalHealthcare":
                icon = <Icon name='user md'/>;
                break;
            case "HealthCheck":
                icon = <Icon name='heartbeat'/>;
                break;
            default:
                assertNever(entry);
        }

        return (
            <div key={entry.id} style={entryStyle}>
                <h4>{entry.date}: {entry.description} {icon}</h4>
                <ul>
                    {entry.diagnosisCodes?.map((code, index) => <li key={ index }>{ code }: {diagnosis[code].name}</li>)}
                </ul>
            </div>
        );
    }) : <p>This patient does not have any entries.</p>;

    return (
        <div>
            <h3>Entries</h3>
            { content }
        </div>
    );
};

export default PatientInfoPage;