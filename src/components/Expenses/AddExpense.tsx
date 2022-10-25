import React, { useState } from "react"
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonButton, IonButtons, IonBackButton, IonSelect, IonSelectOption, IonDatetime, useIonToast } from '@ionic/react';
import { useHistory, useParams } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db";

export default function AddExpense() {
    const params = useParams<any>();
    const [present] = useIonToast();
    const { id } = params;
    const [data, setData] = useState({
        type: "",
        amount: "",
        date: null,
        comment: "",
        tripId: id,
    });

    const [err, setErr] = useState({
        type: "",
        amount: "",
        date: "",
    });

    const onChange = (value: any, type: string) => {
        setData({ ...data, [type]: value });
    }

    const { add } = useIndexedDB("expenses");

    const history = useHistory();

    const validate = () => {
        let isPass: boolean = true;
        let err = {
            type: "",
            amount: "",
            date: "",
        }
        if (!data.type) {
            isPass = false;
            err.type = "Type is required";
        } else {
            err.type = "";
        }
        if (!data.amount) {
            isPass = false;
            err.amount = "Amount is required";
        } else {
            err.amount = "";
        }
        if (!data.date) {
            isPass = false;
            err.date = "Date is required";
        } else {
            err.date = "";
        }

        setErr(err);

        return isPass;
    }

    const handleSubmit = () => {
        if (validate()) {
            add(data);
            setData({
                type: "",
                amount: "",
                date: null,
                comment: "",
                tripId: id,
            })
            present({
                message: 'Add Expense successfull',
                duration: 3000,
                position: 'top'
            });
            history.goBack();
        }
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
                    <h1 className="display-4 text-center">Add Expense</h1>
                    <div>
                        <IonLabel>Type</IonLabel>
                        <IonSelect interface="action-sheet" placeholder="Select Type" onIonChange={(e) => onChange(e.detail.value, "type")}>
                            <IonSelectOption value="Travel">Travel</IonSelectOption>
                            <IonSelectOption value="Foods">Foods</IonSelectOption>
                            <IonSelectOption value="Hired room">Hired room</IonSelectOption>
                            <IonSelectOption value="Others">Others</IonSelectOption>
                        </IonSelect>
                        <div className="text-danger mb-3">{err.type}</div>
                    </div>
                    <div>
                        <IonLabel>Amount</IonLabel>
                        <IonInput type="number" value={data.amount} placeholder="Enter Amount" onIonChange={(e) => onChange(e.detail.value!, "amount")}></IonInput>
                        <div className="text-danger mb-3">{err.amount}</div>
                    </div>
                    <div>
                        <IonLabel>Date</IonLabel>
                        <IonInput type="date" value={data.date} placeholder="Choose Date" onIonChange={(e) => onChange(e.detail.value!, "date")}></IonInput>
                        <div className="text-danger mb-3">{err.date}</div>
                    </div>
                    <div>
                        <IonLabel>Addtional Comment</IonLabel>
                        <IonInput value={data.comment} placeholder="Enter Addtional Comment" onIonChange={(e) => onChange(e.detail.value!, "comment")}></IonInput>
                    </div>
                </div>
                <div className="mt-4 d-flex justify-content-center" style={{ width: "100%" }}>
                    <IonButton className="me-3" onClick={handleSubmit}>Add</IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}