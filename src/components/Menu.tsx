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
  heartSharp, mailOpenOutline,
  mailOutline,
  mailSharp, peopleCircleOutline,
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
    title: 'Fiainana',
    url: '/page/fiainana',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Tosika',
    url: '/page/Outbox',
    iosIcon: mailOpenOutline,
    mdIcon: mailOpenOutline
  },
  {
    title: 'Hanova anarana',
    url: '/page/anarana',
    iosIcon: peopleCircleOutline,
    mdIcon: peopleCircleOutline
  },
  {
    title: 'Favorites',
    url: '/page/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Fiainana be dia be',
    url: '/page/Archived',
    iosIcon: bookmarkOutline,
    mdIcon: bookmarkOutline
  },
];

const Menu: React.FunctionComponent<MenuProps> = ({ selectedPage }) => {

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>FIAINANABDB</IonListHeader>
          <IonNote>fiainanabediabe@gmail.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={selectedPage === appPage.title ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
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
