import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db"
import { useHistory, useParams } from "react-router-dom";
import { dataInterface } from "../Constants";

export default function TripDetail() {
    const params = useParams<any>();
    const { id } = params;
    const { getByID } = useIndexedDB("trips");
    const [data, setData] = useState<dataInterface>();

    const history = useHistory();

    useEffect(() => {
        getByID(parseInt(id)).then(res => {
            setData(res)
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
                <h3 className="display-4 text-center my-2">Trip detail</h3>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Name: {data?.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <div><span style={{ fontWeight: "700" }}>Destination: </span>{data?.destination}</div>
                        <div><span style={{ fontWeight: "700" }}>Date: </span>{data?.date}</div>
                        <div><span style={{ fontWeight: "700" }}>Description: </span>{data?.description}</div>
                        <div><span style={{ fontWeight: "700" }}>Duration: </span>{data?.duration}</div>
                        <div><span style={{ fontWeight: "700" }}>Requires risk assessment: </span>{data?.riskAssessment ? "Yes" : "No"}</div>
                        <div className="mt-4 d-flex justify-content-center" style={{ width: "100%" }}>
                            <IonButton className="me-3" onClick={() => history.push("/add/expense/" + id)}>Add Expense</IonButton>
                            <IonButton className="me-3" color="tertiary" onClick={() => history.push("/viewAllExpenses/" + id)}>View All Expense</IonButton>
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}