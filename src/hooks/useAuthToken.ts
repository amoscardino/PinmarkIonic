import { useEffect, useState } from 'react';
import { getAuthToken, saveAuthToken } from '../utils/authToken';

interface UseAuthTokenHandlers {
    loadAuthToken: () => Promise<string>;
    updateAuthToken: (newToken: string) => Promise<void>;
}

const useAuthToken = (): [string, UseAuthTokenHandlers] => {
    const [authToken, setAuthToken] = useState('');

    const loadAuthToken = async () => {
        const value = await getAuthToken();

        setAuthToken(value);

        return value;
    };

    useEffect(() => {
        loadAuthToken();
    }, []);

    const updateAuthToken = async (newToken: string) => {
        await saveAuthToken(newToken);

        setAuthToken(newToken);
    };

    return [authToken, { loadAuthToken, updateAuthToken }];
};

export default useAuthToken;
