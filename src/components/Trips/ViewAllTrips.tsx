import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar, useIonActionSheet, useIonToast } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { useHistory } from "react-router-dom";

export default function ViewAllTrips() {
    const { getAll, deleteRecord } = useIndexedDB("trips");
    const deleteExpense = useIndexedDB("expenses").deleteRecord;
    const getAllExpense = useIndexedDB("expenses").getAll;

    const [data, setData] = useState<any[]>([]);
    const [baseItems, setBaseItems] = useState<any[]>([]);
    const [search, setSearch] = useState<any>("");
    const [present] = useIonActionSheet();
    const [toast] = useIonToast();

    const history = useHistory();

    useEffect(() => {
        getAll().then(res => {
            setData(res);
            setBaseItems(res);
        })
    }, []);

    const onChange = (value: any) => {
        setSearch(value);
    }

    const handleSearch = () => {
        let filter = baseItems.filter((x: any) => x.name.toLowerCase().includes(search.toLowerCase()));
        if (!search) {
            setData(baseItems);
        } else {
            setData(filter);
        }
    }

    const confirmDelete = (id: number) => {
        deleteRecord(id).then(() => {
            let data = baseItems.filter((x: any) => x.id !== id);
            setData(data);
            setBaseItems(data);
            toast({
                message: 'Delete Trip successfully',
                duration: 3000,
                position: 'top'
            });
        });
        getAllExpense().then(res => {
            res = res.filter(x => x.tripId === id.toString());
            res.map(item => {
                deleteExpense(item.id)
            })
        })
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
                <h3 className="display-4 text-center my-2">View All Trips</h3>
                <div className="d-flex mx-3 mb-2">
                    <IonInput placeholder="Enter Name to search" onIonChange={(e) => onChange(e.detail.value!)}></IonInput>
                    <IonButton onClick={handleSearch} color="tertiary">Search</IonButton>
                </div>
                <IonList>
                    {data ? data.map(item => (
                        <IonItemSliding key={item.id}>
                            <IonItemOptions side="start">
                                <IonItemOption color="tertiary" onClick={() => history.push(`/detail/${item.id}`)}>Detail</IonItemOption>
                            </IonItemOptions>

                            <IonItem>
                                <IonLabel>{item.id + " - " + item.name + " - " + item.date}</IonLabel>
                            </IonItem>

                            <IonItemOptions side="end">
                                <IonItemOption color="warning" onClick={() => history.push("/editTrip/" + item.id)}>Edit</IonItemOption>
                                <IonItemOption color="danger" onClick={() =>
                                    present({
                                        header: 'Delete Trip?',
                                        buttons: [
                                            {
                                                text: 'Delete',
                                                role: 'destructive',
                                                handler() {
                                                    confirmDelete(item.id)
                                                },
                                            },
                                            {
                                                text: 'Cancel',
                                                role: 'cancel',
                                                data: {
                                                    action: 'cancel',
                                                },
                                            },
                                        ],
                                        // onDidDismiss:,
                                    })
                                }>Delete</IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    )): "No data"}
                </IonList>
            </IonContent>
        </IonPage>
    )
}