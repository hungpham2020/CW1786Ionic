import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonButton, IonButtons } from '@ionic/react';
import { useIndexedDB } from "react-indexed-db";
import {useHistory} from "react-router-dom"

interface dataInterface {
    name: string,
    destination: string,
    date: string | null,
    description: string,
    duration: number | null,
    riskAssessment: boolean
}

export default function AddTrip() {
    const [data, setData] = useState<dataInterface>({
        name: "",
        destination: "",
        date: null,
        description: "",
        duration: null,
        riskAssessment: true
    });

    const [err, setErr] = useState({
        name: "",
        destination: "",
        date: "",
        duration: "",
    })

    const history = useHistory();

    const { add, clear } = useIndexedDB("trips");

    const clearExpenses = useIndexedDB("expenses").clear;

    const onChange = (value: any, type: string) => {
        setData({ ...data, [type]: value });
    }   

    const handleSubmit = () => {
        if (validate()) {
            add(data)
            setData({
                name: "",
                destination: "",
                date: null,
                description: "",
                duration: null,
                riskAssessment: true
            })
        }
    }

    const validate = () => {
        let isPass: boolean = true;
        let err = {
            name: "",
            destination: "",
            date: "",
            duration: "",
        }
        if (!data.name) {
            isPass = false;
            err.name = "Name is required";
        } else {
            err.name = "";
        }
        if (!data.destination) {
            isPass = false;
            err.destination = "Destination is required";
        } else {
            err.destination = "";
        }
        if (!data.date) {
            isPass = false;
            err.date = "Date is required";
        } else {
            err.date = "";
        }
        if (!data.duration) {
            isPass = false;
            err.duration = "Duration is required";
        } else {
            err.duration = "";
        }

        setErr(err);

        return isPass;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>CW1786</IonTitle>
                    <IonButtons slot="end">
                        <IonButton auto-hide="true" onClick={() => history.push('/viewalltrips')}>View All Trips</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="mt-3 ms-3">
                    <h1 className="display-4 text-center">Add Trip</h1>
                    <div>
                        <IonLabel>Name</IonLabel>
                        <IonInput value={data.name} placeholder="Enter Name of Trip" onIonChange={(e) => onChange(e.detail.value!, "name")}></IonInput>
                        <div className="text-danger mb-3">{err.name}</div>
                    </div>
                    <div>
                        <IonLabel>Destination</IonLabel>
                        <IonInput value={data.destination} placeholder="Enter Destination" onIonChange={(e) => onChange(e.detail.value!, "destination")}></IonInput>
                        <div className="text-danger mb-3">{err.destination}</div>
                    </div>
                    <div>
                        <IonLabel>Date</IonLabel>
                        <IonInput type="date" value={data.date} placeholder="Choose Date" onIonChange={(e) => onChange(e.detail.value!, "date")}></IonInput>
                        <div className="text-danger mb-3">{err.date}</div>
                    </div>
                    <div>
                        <IonLabel>Description</IonLabel>
                        <IonInput value={data.description} placeholder="Enter Description" onIonChange={(e) => onChange(e.detail.value!, "description")}></IonInput>
                    </div>
                    <div>
                        <IonLabel>Duration</IonLabel>
                        <IonInput type="number" value={data.duration} placeholder="Enter Duration" onIonChange={(e) => onChange(e.detail.value!, "duration")}></IonInput>
                        <div className="text-danger mb-3">{err.duration}</div>
                    </div>
                </div>
                <IonList>
                    <IonRadioGroup value={data.riskAssessment} onIonChange={(e) => onChange(e.detail.value, "riskAssessment")}>
                        <IonLabel className="ms-3">Requires risk assessment</IonLabel>
                        <IonItem>
                            <IonLabel>Yes</IonLabel>
                            <IonRadio slot="end" value={true} />
                        </IonItem>

                        <IonItem>
                            <IonLabel>No</IonLabel>
                            <IonRadio slot="end" value={false} />
                        </IonItem>
                    </IonRadioGroup>
                </IonList>
                <div className="mt-4 d-flex justify-content-center" style={{ width: "100%" }}>
                    <IonButton className="me-3" onClick={handleSubmit}>Add</IonButton>
                    <IonButton className="me-3" color="warning" onClick={() => {
                        clear();
                        clearExpenses();
                    }}>Reset Data</IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}