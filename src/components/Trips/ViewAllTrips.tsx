import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { useHistory } from "react-router-dom";

export default function ViewAllTrips() {
    const { getAll } = useIndexedDB("trips");

    const [data, setData] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<any>(null);

    const history = useHistory();

    useEffect(() => {
        getAll().then(res => {
            setData(res);
        })
    }, []);

    const handleItemClick = (item: any) => {
        setIsOpen(!isOpen);
        setCurrentItem(item);
    }

    const handleBtnClick = (btnType: string) => {
        switch (btnType) {
            case "detail":
                history.push(`/detail/${currentItem?.id}`);
                break;
            case "edit":
                history.push("/edit/" + currentItem?.id);
                break;
            case "delete":
                
                break;
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>CW1786</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton auto-hide="true">Back</IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h3 className="display-4 text-center my-2">View All Trips</h3>
                <IonList>
                    {data.map(item => (
                        <IonItem key={item.id} onClick={() => handleItemClick(item)}>
                            <IonLabel>{item.id + " - " + item.name + " - " + item.date}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
                <IonModal
                    isOpen={isOpen}
                    onBlur={() => setIsOpen(!isOpen)}
                    initialBreakpoint={0.25}
                    breakpoints={[0, 0.25, 0.5, 0.75]}
                    handleBehavior="cycle"
                >
                    <IonContent className="ion-padding">
                        <IonList className="pt-4">
                            <IonItem onClick={() => handleBtnClick("detail")}>
                                <IonLabel className="text-center">Detail</IonLabel>
                            </IonItem>
                            <IonItem onClick={() => handleBtnClick("edit")}>
                                <IonLabel className="text-center">Edit</IonLabel>
                            </IonItem>
                            <IonItem onClick={() => handleBtnClick("delete")}>
                                <IonLabel className="text-center">Delete</IonLabel>
                            </IonItem>
                        </IonList>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    )
}