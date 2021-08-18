import { useState, useRef, useEffect } from 'react';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { closeSharp, keyOutline } from 'ionicons/icons';
import { getAuthToken, saveAuthToken } from '../utils/authToken';

interface SettingsModalProps {
    dismiss: () => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({ dismiss }) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const loadAuthToken = async () => {
            const authToken = await getAuthToken();
            setToken(authToken);
        };

        loadAuthToken();
    }, []);

    const handleClose = () => {
        dismiss();
    };

    const handleSave = async () => {
        await saveAuthToken(token);
        dismiss();
    };

    return (
        <IonContent>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>

                    <IonButtons slot="primary">
                        <IonButton onClick={dismiss}>
                            <IonIcon slot="icon-only" icon={closeSharp} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonList inset={true}>
                <IonItem color="light">
                    <IonIcon slot="start" icon={keyOutline} />

                    <IonLabel position="floating">
                        Pinboard Auth Token
                    </IonLabel>

                    <IonInput
                        type="text"
                        value={token}
                        onChange={e => setToken(e.currentTarget.value?.toString() || '')}
                    />
                </IonItem>
            </IonList>

            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonButton expand="block" fill="outline" onClick={handleClose}>
                            Close
                        </IonButton>
                    </IonCol>

                    <IonCol>
                        <IonButton expand="block" fill="solid" onClick={handleSave}>
                            Save
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
};

export default SettingsModal;
