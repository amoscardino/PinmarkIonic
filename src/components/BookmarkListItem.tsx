import { IonItem, IonLabel, IonIcon } from '@ionic/react';
import { globeOutline, sparklesOutline } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import { Bookmark } from '../models/Bookmark';

interface BookmarksListItemIconProps {
    isUnread: boolean,
    isPublic: boolean
}

interface BookmarksListItemProps {
    bookmark: Bookmark
}

const BookmarksListItemIcon: React.FC<BookmarksListItemIconProps> = ({ isUnread, isPublic }) => {
    if (isUnread)
        return <IonIcon icon={sparklesOutline} slot="start" />;

    if (isPublic)
        return <IonIcon icon={globeOutline} slot="start" />;

    return <IonIcon slot="start" />
};

const BookmarksListItem: React.FC<BookmarksListItemProps> = ({ bookmark }) => {
    const handleItemClick = async () => {
        await Browser.open({ url: bookmark.url });
    };

    return (
        <IonItem button onClick={handleItemClick}>
            <BookmarksListItemIcon isUnread={bookmark.isUnread} isPublic={bookmark.isPublic} />

            <IonLabel>
                <h2 className="ion-text-wrap">{bookmark.title}</h2>

                <p className="ion-float-end">
                    {bookmark.dateSaved.toLocaleDateString()}
                </p>

                <p>
                    {bookmark.domain}
                </p>
            </IonLabel>
        </IonItem >
    );
};

export default BookmarksListItem;
