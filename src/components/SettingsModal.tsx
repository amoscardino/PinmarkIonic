import { useRef } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/react';
import { closeSharp } from 'ionicons/icons';
import useAuthToken from '../hooks/useAuthToken';

interface SettingsModalProps {
    dismiss: () => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({ dismiss }) => {
    const inputRef = useRef<HTMLIonInputElement>(null);
    const [authToken, { updateAuthToken }] = useAuthToken();

    const handleSave = async () => {
        const newToken = inputRef.current?.value?.toString() || '';

        await updateAuthToken(newToken);
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
                    <IonLabel position="stacked">Pinboard Auth Token</IonLabel>
                    <IonInput ref={inputRef} value={authToken} />
                </IonItem>

                <IonItem
                    button
                    detail={false}
                    onClick={handleSave}
                    color="primary"
                >
                    Save
                </IonItem>
            </IonList>
        </IonContent>
    );
};

export default SettingsModal;
