import { useEffect, useState } from 'react';
import { isPlatform } from '@ionic/react';
import { Http } from '@capacitor-community/http';
import { Bookmark } from '../models/Bookmark';
import useAuthToken from './useAuthToken';

interface UseBookmarksHandlers {
    loadBookmarks: () => Promise<void>;
}

export const BOOKMARKS_STATUS = {
    notLoaded: 'not loaded',
    loading: 'loading',
    loaded: 'loaded'
};

const useBookmarks = (): [Bookmark[], string, string, UseBookmarksHandlers] => {
    const [_, { loadAuthToken }] = useAuthToken();
    const [state, setState] = useState({
        bookmarks: [],
        status: BOOKMARKS_STATUS.notLoaded,
        error: ''
    });

    const loadBookmarks = async () => {
        if (state?.status === BOOKMARKS_STATUS.loading)
            return;

        setState(prevState => ({ ...prevState, error: '' }));

        var authToken = await loadAuthToken();

        if (!authToken)
            return;

        setState(prevState => ({ ...prevState, status: BOOKMARKS_STATUS.loading }));

        let pinboardUrl = `https://api.pinboard.in/v1/posts/recent?format=json&auth_token=${authToken}`;

        // CORS workaround
        if (!isPlatform('ios') && !isPlatform('android'))
            pinboardUrl = `https://moscardino-cors.azurewebsites.net/api/proxy?url=${encodeURIComponent(pinboardUrl)}`

        try {
            const response = await Http.request({
                method: 'GET',
                url: pinboardUrl,
                headers: {
                    'pragma': 'no-cache',
                    'cache-control': 'no-cache'
                }
            });

            const data = JSON.parse(response.data);
            const bookmarks = data.posts
                .map((post: any) => ({
                    url: post.href,
                    domain: new URL(post.href).hostname.replace('www.', ''),
                    title: post.description,
                    dateSaved: new Date(post.time),
                    isPublic: post.shared === 'yes',
                    isUnread: post.toread === 'yes'
                }));

            setState(prevState => ({
                ...prevState,
                bookmarks: bookmarks,
                status: BOOKMARKS_STATUS.loaded
            }));
        }
        catch (err) {
            setState(prevState => ({
                ...prevState,
                bookmarks: [],
                status: BOOKMARKS_STATUS.notLoaded,
                error: (Error(err)).message
            }));
        }
    };

    useEffect(() => {
        loadBookmarks();
    }, []);

    return [state.bookmarks, state.status, state.error, { loadBookmarks }];
};

export default useBookmarks;
