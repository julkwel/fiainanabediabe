import React, {useEffect, useState} from "react";
import {Plugins} from "@capacitor/core";
import {
    IonAvatar, IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonChip,
    IonImg,
    IonItem,
    IonLabel,
    IonList, IonModal
} from "@ionic/react";
import image from '../assets/bg-menu.jpg';
import Img from "react-image";


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
        <IonCard mode={"md"} style={{height: "80vh", overflow: "hidden"}}>
            <div style={{overflowY: "scroll", height: "100%"}}>
                <IonList lines={"full"}>
                    {
                        myFavorites.map((item: any, key: any) => {
                            return (
                                <IonItem key={key}>
                                    <IonAvatar slot={"start"}>
                                        <IonImg
                                            src={item.image}
                                            alt="Fiainana BDB"/>
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
                                            {item.title.replace('zanaku', user).slice(0, 20)} ...
                                        </h3>
                                        <p className={"ion-text-wrap"}>
                                            {item.description.replace('zanaku', user).slice(0, 50)} ...
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
                <Img
                    unloader={<IonImg src={image} alt={"Fiainana be dia be"}/>}
                    src={currentPhoto}
                    alt="Fiainana BDB"/>
                <IonCardHeader>
                    <h6>{currentTitle.replace('zanaku', user)}</h6>
                    <IonChip color="secondary">
                        <span style={{fontSize: "10px"}}>{currentDate}</span>
                    </IonChip>
                </IonCardHeader>
                <IonCardContent style={{textAlign: "justify", overflowY: "scroll"}}>
                    <p>{currentDesc.replace('zanaku', user)}</p>
                </IonCardContent>
                <IonButton fill={"clear"} size={"small"} onClick={() => setShowModal(false)}>Hidiana</IonButton>
            </IonModal>
        </IonCard>
    )
};

export default Favorites;
