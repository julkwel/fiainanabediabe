import React, {useEffect, useState} from "react";
import {Plugins} from "@capacitor/core";
import {
    IonAvatar, IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonChip, IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonList, IonModal
} from "@ionic/react";
import {heartCircleOutline} from "ionicons/icons";
import backgroundFallBack from "../assets/bg-menu.jpg";

interface ContainerProps {
    name: string,
    user: string
}

/**
 * Get my favorites local data
 *
 * @param name
 * @param user
 *
 * @constructor
 */
const Favorites: React.FC<ContainerProps> = ({name, user}) => {
    const pattern = /zanaku/gi;
    const {Storage} = Plugins;
    const [myFavorites, setMyFavorites] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);

    const [currentDesc, setCurrentDesc] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentPhoto, setCurrentPhoto] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');

    const getMyFavorites = () => {
        Storage.get({key: 'fiainana_my_favorites'}).then((res: any) => {
            let storeData = JSON.parse(res.value);
            setMyFavorites(storeData ? storeData : [])
        });
    };

    useEffect(() => {
        getMyFavorites();
    }, []);

    return (
        <div>
            <div style={{overflowY: "scroll", height: "100%"}}>
                <IonList lines={"full"}>
                    {
                        myFavorites.map((item: any, key: any) => {
                            return (
                                <IonItem key={key}>
                                    <IonAvatar slot={"start"}>
                                        <IonIcon color={"danger"} icon={heartCircleOutline} size={"large"}/>
                                        <span style={{fontSize:"6px",display:"flex"}}>{item.datepublication}</span>
                                    </IonAvatar>
                                    <IonLabel
                                        onClick={() => {
                                            setCurrentDesc(item.description);
                                            setCurrentTitle(item.title);
                                            setCurrentPhoto(item.image);
                                            setCurrentDate(item.datepublication);
                                            setShowModal(true);
                                        }}
                                    >
                                        <h3 className={"ion-text-wrap"}>
                                            {item.title.replace(pattern, user ? user : 'zanako').slice(0, 20)} ...
                                        </h3>
                                        <p className={"ion-text-wrap"}>
                                            {item.description.replace(pattern, user ? user : 'zanako').slice(0, 50)} ...
                                        </p>
                                    </IonLabel>
                                </IonItem>
                            )
                        })
                    }
                </IonList>
            </div>

            <IonModal
                mode={"md"}
                swipeToClose={true}
                isOpen={showModal}
            >
                <div style={{overflowY:"scroll"}}>
                    <IonImg
                        onIonError={(e: any) => {
                            e.target.src = backgroundFallBack;
                        }}
                        src={currentPhoto}
                        alt="Fiainana BDB"/>
                    <IonCardHeader>
                        <h6>{currentTitle.replace(pattern, user ? user : 'zanako')}</h6>
                        <IonChip color="secondary">
                            <span style={{fontSize: "10px"}}>{currentDate}</span>
                        </IonChip>
                    </IonCardHeader>
                    <IonCardContent style={{textAlign: "justify", overflowY: "scroll"}}>
                        <p>{currentDesc.replace(pattern, user ? user : 'zanako')}</p>
                    </IonCardContent>
                </div>
                <IonButton fill={"clear"} size={"small"} onClick={() => setShowModal(false)}>Hidiana</IonButton>
            </IonModal>
        </div>
    )
};

export default Favorites;
