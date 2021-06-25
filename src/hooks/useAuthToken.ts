import { useEffect, useState } from 'react';
import { Storage } from '@capacitor/storage';

const STORAGE_KEY = 'Pinmark Auth Token';

interface UseAuthTokenHandlers {
    loadAuthToken: () => Promise<string>;
    updateAuthToken: (newToken: string) => Promise<void>;
}

const useAuthToken = (): [string, UseAuthTokenHandlers] => {
    const [authToken, setAuthToken] = useState('');

    const loadAuthToken = async () => {
        const { value } = await Storage.get({ key: STORAGE_KEY });

        setAuthToken(value || '');

        return value || '';
    };

    useEffect(() => {
        loadAuthToken();
    }, []);

    const updateAuthToken = async (newToken: string) => {
        await Storage.set({ key: STORAGE_KEY, value: newToken });

        setAuthToken(newToken);
    };

    return [authToken, { loadAuthToken, updateAuthToken }];
};

export default useAuthToken;
