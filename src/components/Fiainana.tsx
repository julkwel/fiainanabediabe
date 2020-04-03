import React, {useEffect, useState} from 'react';
import './fiainana.css';
import Axios from 'axios';
import HTTP_BASE_URL from "../constant/BaseUrlConstant";
import {
    IonAvatar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader, IonChip,
    IonImg, IonItem, IonLabel, IonList, IonLoading, IonModal,
    IonSlide,
    IonSlides
} from "@ionic/react";

interface ContainerProps {
    name: string,
    user: string
}

/**
 * @param name
 * @param user
 * @constructor
 */
const Fiainana: React.FC<ContainerProps> = ({name, user}) => {
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

    useEffect(() => {
        Axios.get(HTTP_BASE_URL + '/teny/api/').then(res => {
            setFiainanas(res.data);

            setShowLoading(false);
        });
    }, []);

    return (
        <>
            <IonSlides mode={"ios"}
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
                                    <img
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
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Mahandrasa kely ...'}
                duration={5000}
            />

            <IonModal
                mode={"ios"}
                swipeToClose={true}
                isOpen={showModal}
            >
                <IonImg src={currentPhoto}/>
                <IonCardHeader>
                    <h6>{currentTitle.replace('zanaku',user)}</h6>
                    <IonChip color="secondary">
                        <span style={{fontSize: "10px"}}>{currentDate}</span>
                    </IonChip>
                </IonCardHeader>
                <IonCardContent style={{textAlign: "justify", overflowY: "scroll"}}>
                    <p>{currentDesc.replace('zanaku',user)}</p>
                </IonCardContent>
                <IonButton fill={"clear"} size={"small"} onClick={() => setShowModal(false)}>Hidiana</IonButton>
            </IonModal>

            <IonCard mode={"ios"} style={{marginTop: "0px", height: "40vh", overflow: "hidden"}}>
                <div style={{overflowY: "scroll", height: "100%"}}>
                    <IonList>
                        {
                            fiainanas.map((item: any, key: any) => {
                                return (
                                    <IonItem key={key}
                                             onClick={() => {
                                                 setCurrentDesc(item.description);
                                                 setCurrentTitle(item.title);
                                                 setCurrentPhoto(item.image);
                                                 setCurrentDate(item.datepublication);
                                                 setShowModal(true);
                                             }}
                                    >
                                        <IonAvatar slot={"start"}>
                                            <IonImg src={item.image}/>
                                        </IonAvatar>
                                        <IonLabel>
                                            <h3 className={"ion-text-wrap"}>
                                                {item.title.replace('zanaku',user).slice(0, 20)} ...
                                            </h3>
                                            <p className={"ion-text-wrap"}>
                                                {item.description.replace('zanaku',user).slice(0, 50)} ...
                                            </p>
                                        </IonLabel>
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
