import React from "react";
import {IonCard, IonCardContent, IonCardTitle, IonImg} from "@ionic/react";
import image from '../assets/bg-menu.jpg';

const Fiainanabediabe:React.FC = () => {
    let date = new Date();
    let currentYear = date.getFullYear();

    return (
        <>
            <IonCard mode={"md"}>
                <IonImg src={image} alt="Fiainana be dia be"/>
                <IonCardTitle className={"text-center"} color={"danger"} style={{marginTop:"2rem"}}>FIAINANABDB</IonCardTitle>
                <IonCardContent>
                    <p style={{textAlign:"justify"}}>Fiainana be dia be dia application iray natao hizarana hafatra sy tosika fampaherezana notsongaina avy ao amin'ny baiboly isan'andro hoanao.</p>
                    <div style={{padding:"10px",fontSize:"12px",textAlign:"center"}}>
                        <span>Fiainana be dia be - {currentYear}</span>
                    </div>
                </IonCardContent>
            </IonCard>
        </>
    )
}

export default Fiainanabediabe;
