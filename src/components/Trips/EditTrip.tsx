import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonButton, IonButtons, useIonToast, IonBackButton } from '@ionic/react';
import { useIndexedDB } from "react-indexed-db";
import { useHistory, useParams } from "react-router-dom"
import { dataInterface } from "../Constants";

export default function Editrip() {
    const params = useParams<any>();
    const { id } = params;
    const [present] = useIonToast();
    const [data, setData] = useState<dataInterface>({
        id: parseInt(id),
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

    const { getByID, update } = useIndexedDB("trips");

    useEffect(() => {
        getByID(id).then(res => setData({
            ...data,
            name: res.name,
            destination: res.destination,
            date: res.date,
            description: res.description,
            duration: res.duration,
            riskAssessment: res.riskAssessment
        }))
    }, []);

    const onChange = (value: any, type: string) => {
        setData({ ...data, [type]: value });
    }

    const handleSubmit = () => {
        if (validate()) {
            update(data).then(() => {
                setData({
                    name: "",
                    destination: "",
                    date: null,
                    description: "",
                    duration: null,
                    riskAssessment: true
                });
                present({
                    message: 'Edit Trip successfully',
                    duration: 3000,
                    position: 'top'
                });
                history.goBack();
            }).catch(err => console.log(err));
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
                <IonToolbar color="primary">
                    <IonTitle>CW1786</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton auto-hide="true">Back</IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="mt-3 ms-3">
                    <h1 className="display-4 text-center">Edit Trip</h1>
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
                    <IonButton className="me-3" onClick={handleSubmit}>Submit</IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}