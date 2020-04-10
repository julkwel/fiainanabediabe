import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  bookmarkOutline,
  heartOutline,
  heartSharp, listSharp,
  mailOutline,
  mailSharp,
} from 'ionicons/icons';
import './Menu.css';

interface MenuProps extends RouteComponentProps {
  selectedPage: string;
}

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Hafatra',
    url: '/page/fiainana',
    iosIcon: listSharp,
    mdIcon: listSharp
  },
  {
    title: 'Ireo teny tiako',
    url: '/page/tiako',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Fiainana be dia be',
    url: '/page/apropos',
    iosIcon: bookmarkOutline,
    mdIcon: bookmarkOutline
  },
];

const Menu: React.FunctionComponent<MenuProps> = ({ selectedPage }) => {

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <div className="div">
            <IonListHeader>FIAINANABDB</IonListHeader>
            <IonNote>fiainanabediabe@gmail.com</IonNote>
          </div>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
