import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from "@ionic/react";
import { globeOutline, newspaperOutline } from "ionicons/icons";
import { Bookmark } from "../models/Bookmark";

interface BookmarksListItemProps {
    bookmark: Bookmark
}

const BookmarksListItem: React.FC<BookmarksListItemProps> = ({ bookmark }) => (
    <IonCard href={bookmark.url} color="light">
        <IonCardHeader>
            <IonCardTitle>
                {bookmark.title}
            </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
            {bookmark.isUnread && <IonIcon icon={newspaperOutline} />}
            {bookmark.isPublic && <IonIcon icon={globeOutline} />}

            {(bookmark.isPublic || bookmark.isUnread) && (' ')}

            {bookmark.domain}
        </IonCardContent>
    </IonCard>
);

export default BookmarksListItem;
