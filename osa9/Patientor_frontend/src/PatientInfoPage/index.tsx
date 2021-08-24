import React, { useEffect } from "react";
import { fillPatientInfo, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

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
            console.log('test');
            void fetchPatientsFullInfo();
        }
    }, [dispatch]);

    return (
        <div>
            <h1>Patient information</h1>
            <h2>{patient.name}</h2>
            <p>gender: {patient.gender}</p>
            <p>date of birth: {patient.dateOfBirth}</p>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
        </div>
    );
};

export default PatientInfoPage;