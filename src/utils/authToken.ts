import { Storage } from '@capacitor/storage';

const STORAGE_KEY = 'Pinmark Auth Token';

export const getAuthToken = async (): Promise<string> => {
    const { value } = await Storage.get({ key: STORAGE_KEY });

    return value || '';
};

export const saveAuthToken = async (newToken: string): Promise<void> => {
    await Storage.set({ key: STORAGE_KEY, value: newToken });
};

