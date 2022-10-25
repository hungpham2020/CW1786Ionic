import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { useHistory, useParams } from "react-router-dom";

export default function ViewAllExpenses() {
    const { getAll } = useIndexedDB("expenses");
    const params = useParams<any>();
    const { id } = params;

    const [data, setData] = useState<any[]>([]);

    const history = useHistory();

    useEffect(() => {
        getAll().then(res => {
            setData(res);
        })
    }, []);

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
                <h3 className="display-4 text-center my-2">View All Expenses</h3>
                <IonList>
                    {data ? data.filter(x => x.tripId === id).map(item => (
                        // <IonItemSliding key={item.id}>
                        //     <IonItemOptions side="start">
                        //         <IonItemOption color="tertiary" onClick={() => history.push(`/detail/${item.id}`)}>Detail</IonItemOption>
                        //     </IonItemOptions>

                        <IonItem key={item.id}>
                            <IonLabel>{item.id + " - " + item.type + " - "+  (item.comment ? (item.comment + " - ") : "") + item.date}</IonLabel>
                        </IonItem>

                        //     <IonItemOptions side="end">
                        //         <IonItemOption color="warning" onClick={() => history.push("/edit/" + item.id)}>Edit</IonItemOption>
                        //         <IonItemOption color="danger">Delete</IonItemOption>
                        //     </IonItemOptions>
                        // </IonItemSliding>
                    )): <div>No data</div>}
                </IonList>
            </IonContent>
        </IonPage>
    )
}