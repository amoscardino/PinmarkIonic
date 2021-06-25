import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import { settingsSharp } from 'ionicons/icons';
import BookmarkList from '../components/BookmarkList';
import SettingsModal from '../components/SettingsModal';
import useBookmarks from '../hooks/useBookmarks';

const BookmarksPage: React.FC = () => {
    const [bookmarks, status, error, { loadBookmarks }] = useBookmarks();

    const onSettingsDismiss = () => {
        dismissSettingsModal();
        loadBookmarks();
    };

    const [showSettingsModal, dismissSettingsModal] = useIonModal(SettingsModal, { dismiss: onSettingsDismiss });

    return (
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar>
                    <IonTitle>Pinmark</IonTitle>

                    <IonButtons slot="primary">
                        <IonButton onClick={() => showSettingsModal()}>
                            <IonIcon slot="icon-only" icon={settingsSharp} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense" translucent={true}>
                    <IonToolbar>
                        <IonTitle size="large">Pinmark</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <BookmarkList status={status} error={error} bookmarks={bookmarks} />
            </IonContent>
        </IonPage>
    );
};

export default BookmarksPage;
