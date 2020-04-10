import React, {useEffect, useState} from "react";
import {IonAvatar, IonIcon, IonItem, IonLabel, IonList, IonLoading} from "@ionic/react";
import {partlySunnyOutline} from "ionicons/icons";
import Axios from "axios";
import HTTP_BASE_URL from "../constant/BaseUrlConstant";
import {Plugins} from "@capacitor/core";

/**
 * Liste tosika
 *
 * @constructor
 */
const Tosika: React.FC = () => {
    const {Storage} = Plugins;
    const [tosika, setTosika] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        Axios.get(HTTP_BASE_URL + '/tosika/api/').then(res => {
            setTosika(res.data);
            Storage.set({
                key: 'fiainana_tosika',
                value: JSON.stringify(res.data)
            }).then(() => setShowLoading(false));
        }).catch(() => {
            Storage.get({
                key: 'fiainana_tosika'
            }).then((res: any) => {
                setShowLoading(false);
                setTosika(JSON.parse(res.value));
            });
        });
    }, []);

    return (
        <>
            <IonLoading
                mode={"md"}
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Mahandrasa kely azafady ...'}
            />
            <IonList lines={"full"}>
                {
                    tosika.map((item: any, key: any) => {
                        return (
                            <IonItem key={key}>
                                <IonAvatar slot={"start"}>
                                    <IonIcon color={"danger"} icon={partlySunnyOutline} size={"large"}/>
                                    <span style={{fontSize: "6px", display: "flex"}}>{item.dateAdd}</span>
                                </IonAvatar>
                                <IonLabel>
                                    <h3 className={"ion-text-wrap"}>
                                        {item.message}
                                    </h3>
                                </IonLabel>
                            </IonItem>
                        )
                    })
                }
            </IonList>
        </>
    )
};

export default Tosika;
