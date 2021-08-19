import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonModal
} from '@ionic/react';
import { settingsSharp } from 'ionicons/icons';
import { useQuery } from 'react-query';
import { Bookmark } from '../models/Bookmark';
import { loadBookmarks } from '../utils/pinboardApi';
import BookmarkList from '../components/BookmarkList';
import SettingsPage from './SettingsPage';

const BookmarksPage: React.FC = () => {
    const {
        data: bookmarks,
        status,
        error,
        refetch
    } = useQuery<Bookmark[], Error>('bookmarks', loadBookmarks);

    const handleDismiss = () => {
        dismissSettingsModal();
        refetch();
    };

    const [showSettingsModal, dismissSettingsModal] = useIonModal(SettingsPage, { dismiss: handleDismiss });

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

                <BookmarkList status={status} error={error} bookmarks={bookmarks || []} />
            </IonContent>
        </IonPage>
    );
};

export default BookmarksPage;
