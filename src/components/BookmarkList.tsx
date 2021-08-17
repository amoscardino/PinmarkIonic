import { IonList } from '@ionic/react';
import { Bookmark } from '../models/Bookmark';
import BookmarksListItem from './BookmarkListItem';
import Loader from './Loader';

interface BookmarkListProps {
    status: string,
    error: Error | null,
    bookmarks: Bookmark[]
}

const BookmarkList: React.FC<BookmarkListProps> = ({ status, error, bookmarks }) => {
    switch (status) {
        case 'success':
            return (
                <IonList>
                    {bookmarks.map(bookmark => <BookmarksListItem key={bookmark.url} bookmark={bookmark} />)}
                </IonList>
            );

        case 'loading':
            return <Loader />;

        case 'error':
            return (
                <div className="ion-padding">
                    {error?.message}
                </div>
            );

        default:
            return null;
    }
};

export default BookmarkList;
