import { Http } from "@capacitor-community/http";
import { isPlatform } from "@ionic/react";
import { getAuthToken } from "./authToken";
import { Bookmark } from "../models/Bookmark";

export const loadBookmarks = async (): Promise<Bookmark[]> => {
    const authToken = await getAuthToken();

    let pinboardUrl = `https://api.pinboard.in/v1/posts/recent?format=json&auth_token=${authToken}`;

    // CORS workaround
    if (!isPlatform('ios') && !isPlatform('android'))
        pinboardUrl = `http://localhost:8010/v1/posts/recent?format=json&auth_token=${authToken}`;

    // Introduce a delay to verify loading states
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1500));

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

        return data.posts
            .map((post: any) => ({
                url: post.href,
                domain: new URL(post.href).hostname.replace('www.', ''),
                title: post.description,
                dateSaved: new Date(post.time),
                isPublic: post.shared === 'yes',
                isUnread: post.toread === 'yes'
            }));
    }
    catch (err) {
        throw err;
    }
};
