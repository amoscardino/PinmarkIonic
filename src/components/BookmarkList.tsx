import { IonList } from '@ionic/react';
import { BOOKMARKS_STATUS } from '../hooks/useBookmarks';
import { Bookmark } from '../models/Bookmark';
import BookmarksListItem from './BookmarkListItem';
import Loader from './Loader';

interface BookmarkListProps {
    status: string,
    error: string,
    bookmarks: Bookmark[]
}

const BookmarkList: React.FC<BookmarkListProps> = ({ status, error, bookmarks }) => {
    switch (status) {
        case BOOKMARKS_STATUS.loaded:
            return (
                <IonList>
                    {bookmarks.map(bookmark => <BookmarksListItem key={bookmark.url} bookmark={bookmark} />)}
                </IonList>
            );

        case BOOKMARKS_STATUS.loading:
            return <Loader />;

        case BOOKMARKS_STATUS.notLoaded:
        default:
            if (!error)
                return null;

            return (
                <div className="ion-padding">
                    {error}
                </div>
            );
    }
};

export default BookmarkList;
