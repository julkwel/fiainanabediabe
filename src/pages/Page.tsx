import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonMenuButton,
    IonModal,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter,
} from '@ionic/react';
import React, {useState} from 'react';
import {RouteComponentProps, useHistory} from 'react-router';
import Fiainana from '../components/Fiainana';
import './Page.css';
import Default from "../components/Default";
import {Plugins} from "@capacitor/core";
import Favorites from "../components/Favorites";
import Fiainanabediabe from "../components/Fiainanabediabe";

const Page: React.FC<RouteComponentProps<{ name: string; }>> = ({match}) => {
    const {Storage} = Plugins;
    const [user, setUser] = useState();
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    const handleUser = (evt: any) => {
        if (!user) {
            evt.preventDefault();
            evt.stopPropagation();

            setShowModal(true);
        } else {
            Storage.set({
                key: 'fiainanabediabe_user',
                value: user
            }).then(() => {
                history.push('/page/fiainana');

                setShowModal(false);
            })
        }
    };

    const getUser = () => {
        Storage.get({key: 'fiainanabediabe_user'}).then(res => {
            if (!res.value) {
                setShowModal(true);
            } else {
                setUser(res.value);
            }
        });
    };

    useIonViewWillEnter(() => {
        getUser();
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={"danger"}>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>{(match.params.name === 'fiainana' || match.params.name === 'apropos') ? 'FIAINANABDB' : match.params.name.toUpperCase()}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {
                    match.params.name === 'fiainana' ?
                        <Fiainana name={match.params.name} user={user}/>
                        :
                        match.params.name === 'tiako' ?
                            <Favorites name={match.params.name} user={user}/> :
                            match.params.name === 'apropos' ?
                                <Fiainanabediabe/> :
                                <Default name={match.params.name}/>
                }

                <IonModal
                    mode={"ios"}
                    isOpen={showModal}
                >
                    <h2 className={"text-center"}>Tonga soa !</h2>
                    <IonItem>
                        <IonInput required
                                  placeholder={"Ampidiro ny anaranao *"}
                                  onIonChange={(e: any) => setUser(e.target.value)} type={"text"}/>
                    </IonItem>
                    <IonButton fill={"clear"} size={"small"} onClick={(e: any) => handleUser(e)}>
                        Hanova anarana
                    </IonButton>
                </IonModal>

            </IonContent>
        </IonPage>
    );
};

export default Page;
