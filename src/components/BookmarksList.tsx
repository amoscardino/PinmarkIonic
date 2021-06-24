import { IonList } from "@ionic/react";
import { BOOKMARKS_STATUS } from "../hooks/useBookmarks";
import { Bookmark } from "../models/Bookmark";
import BookmarksListItem from "./BookmarkListItem";
import Loader from "./Loader";

interface BookmarksListProps {
    status: string,
    bookmarks: Bookmark[]
}

const BookmarksList: React.FC<BookmarksListProps> = ({ status, bookmarks }) => {
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
            return null;
    }
};

export default BookmarksList;
