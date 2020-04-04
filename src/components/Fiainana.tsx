import React, {useEffect, useState} from 'react';
import './fiainana.css';
import Axios from 'axios';
import HTTP_BASE_URL from "../constant/BaseUrlConstant";

import {
    IonAvatar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader, IonChip, IonIcon,
    IonImg, IonItem, IonLabel, IonList, IonLoading, IonModal,
    IonSlide,
    IonSlides
} from "@ionic/react";

import {bookOutline, heartCircle, heartOutline} from "ionicons/icons";
import {Plugins} from "@capacitor/core";
import backgroundFallBack from "../assets/bg-menu.jpg";

interface ContainerProps {
    name: string,
    user: string
}

/**
 * Get all list from endpoint
 *
 * @param name
 * @param user
 *
 * @constructor
 */
const Fiainana: React.FC<ContainerProps> = ({name, user}) => {
    const {Storage} = Plugins;

    const [myFavorites, setMyFavorites] = useState([]);
    const [myFavoritesId, setMyFavoritesId] = useState<any>([]);
    const [fiainanas, setFiainanas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showLoading, setShowLoading] = useState(true);

    const [currentDesc, setCurrentDesc] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentPhoto, setCurrentPhoto] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');

    const slideOpts = {
        slidesPerView: 1,
        grabCursor: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        }
    };

    const addToFavorite = (item: any) => {
        let currentFav: any = myFavorites;
        currentFav.push(item);

        Storage.set({
            key: 'fiainana_my_favorites',
            value: JSON.stringify(currentFav)
        }).then(() => getMyFavoritesId());
    };

    const getMyFavorites = () => {
        Storage.get({key: 'fiainana_my_favorites'}).then((res: any) => {
            let storeData = JSON.parse(res.value);
            setMyFavorites(storeData ? storeData : [])
        });
    };

    const getMyFavoritesId = () => {
        Storage.get({key: 'fiainana_my_favorites'}).then((res: any) => {
            let storeData = JSON.parse(res.value);
            let storeId: any = [];

            if (storeData && storeData.length !== 0) {
                storeData.map((item: any) => {
                    return storeId.push(item.id);
                });

                setMyFavoritesId(storeId);
            }

            setShowLoading(false);
        }).catch(() => {
            setShowLoading(false);
        });
    };

    useEffect(() => {
        getMyFavorites();
        Axios.get(HTTP_BASE_URL + '/teny/api/').then(res => {
            if (res.data && res.data.length !== 0) {
                setFiainanas(res.data);

                Storage.set({
                    key: 'fiainana_current_data',
                    value: JSON.stringify(res.data)
                }).then();
            }

            getMyFavoritesId();
        }).catch(() => {
            Storage.get({key: 'fiainana_current_data'}).then((res: any) => {
                setFiainanas(JSON.parse(res.value));

                setShowLoading(false);
            });
        });
    }, []);

    return (
        <>
            <IonSlides mode={"md"}
                       pager={false}
                       options={slideOpts}>
                {
                    fiainanas.map((item: any, key: any) => {
                        return (
                            <IonSlide
                                onClick={() => {
                                    setCurrentDesc(item.description);
                                    setCurrentTitle(item.title);
                                    setCurrentDate(item.datepublication);
                                    setCurrentPhoto(item.image);
                                    setShowModal(true);
                                }}
                                key={key}
                            >
                                <IonCard>
                                    <IonImg
                                        onIonError={(e: any) => {
                                            e.target.src = backgroundFallBack;
                                        }}
                                        style={{width: "100%", height: "40vh"}}
                                        src={item.image}
                                        alt="Fiainana BDB"/>
                                </IonCard>
                            </IonSlide>
                        )
                    })
                }
            </IonSlides>

            <IonLoading
                mode={"md"}
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Mahandrasa kely azafady ...'}
            />

            <IonModal
                mode={"md"}
                swipeToClose={true}
                isOpen={showModal}
            >
                <IonImg
                    onIonError={(e: any) => {
                        e.target.src = backgroundFallBack;
                    }}
                    style={{width: "100%", height: "40vh"}}
                    src={currentPhoto}
                    alt="Fiainana BDB"/>
                <IonCardHeader>
                    <h6>{currentTitle.replace('zanaku', user ? user : 'zanako')}</h6>
                    <IonChip color="secondary">
                        <span style={{fontSize: "10px"}}>{currentDate}</span>
                    </IonChip>
                </IonCardHeader>
                <IonCardContent style={{textAlign: "justify", overflowY: "scroll"}}>
                    <p>{currentDesc.replace('zanaku', user ? user : 'zanako')}</p>
                </IonCardContent>
                <IonButton fill={"clear"} size={"small"} onClick={() => setShowModal(false)}>Hidiana</IonButton>
            </IonModal>

            <IonCard mode={"md"} style={{marginTop: "0px", height: "50vh", overflow: "hidden"}}>
                <div style={{overflowY: "scroll", height: "100%"}}>
                    <IonList>
                        {
                            fiainanas.map((item: any, key: any) => {
                                return (
                                    <IonItem key={key}>
                                        <IonAvatar
                                            onClick={() => {
                                                setCurrentDesc(item.description);
                                                setCurrentTitle(item.title);
                                                setCurrentPhoto(item.image);
                                                setCurrentDate(item.datepublication);
                                                setShowModal(true);
                                            }} slot={"start"}>
                                            <IonIcon size={"large"} icon={bookOutline}/>
                                            <span style={{fontSize: "6px"}}>{item.datepublication}</span>
                                        </IonAvatar>
                                        <IonLabel
                                            onClick={() => {
                                                setCurrentDesc(item.description);
                                                setCurrentTitle(item.title);
                                                setCurrentPhoto(item.image);
                                                setCurrentDate(item.datepublication);
                                                setShowModal(true);
                                            }}>
                                            <h3 className={"ion-text-wrap"}>
                                                {item.title.replace('zanaku', user ? user : 'zanako').slice(0, 20)} ...
                                            </h3>
                                            <p className={"ion-text-wrap"}>
                                                {item.description.replace('zanaku', user ? user : 'zanako').slice(0, 50)} ...
                                            </p>
                                        </IonLabel>
                                        <IonAvatar onClick={() => addToFavorite(item)} slot={"end"}>
                                            <IonIcon
                                                size={"large"}
                                                {...(myFavoritesId.includes(item.id) ? {color: "danger"} : '')}
                                                icon={myFavoritesId.includes(item.id) ? heartCircle : heartOutline}/>
                                        </IonAvatar>
                                    </IonItem>
                                )
                            })
                        }
                    </IonList>
                </div>
            </IonCard>
        </>
    );
};

export default Fiainana;
