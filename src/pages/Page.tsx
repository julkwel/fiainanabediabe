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
import Tosika from "../components/Tosika";

const Page: React.FC<RouteComponentProps<{ name: string; }>> = ({match}) => {
    const {Storage} = Plugins;
    const [user, setUser] = useState();
    const [isHasUser, setHasUser] = useState(false);
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
                setHasUser(true);
            })
        }
    };

    const getUser = () => {
        Storage.get({key: 'fiainanabediabe_user'}).then(res => {
            if (!res.value) {
                setShowModal(true);
            } else {
                setUser(res.value);
                setHasUser(true);
            }
        });
    };

    const handleChange = (event: any) => {
        setUser(event.target.value);
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
                    isHasUser && match.params.name === 'fiainana' ?
                        <Fiainana name={match.params.name} user={user}/>
                        :
                        isHasUser && match.params.name === 'tiako' ?
                            <Favorites name={match.params.name} user={user}/> :
                            isHasUser && match.params.name === 'apropos' ?
                                <Fiainanabediabe/> :
                                isHasUser && match.params.name === 'tosika' ?
                                    <Tosika/> :
                                    <Default name={match.params.name}/>
                }

                <IonModal
                    mode={"ios"}
                    isOpen={showModal}
                >
                    <h2 className={"text-center"}>Tonga soa !</h2>
                    <IonItem>
                        <IonInput required
                                  defaultValue={user}
                                  id={"nomVal"}
                                  placeholder={"Ampidiro ny anaranao *"}
                                  onIonInput={(e: any) => handleChange(e)}
                                  type={"text"}/>
                    </IonItem>
                    <IonButton color={"primary"}
                               size={"small"}
                               onClick={(e: any) => handleUser(e)}>
                        Hisoratra anarana
                    </IonButton>
                </IonModal>

            </IonContent>
        </IonPage>
    );
};

export default Page;
