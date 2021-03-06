import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import BookmarksPage from './pages/BookmarksPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const queryClient = new QueryClient();

const App: React.FC = () => (
    <IonApp>
        <QueryClientProvider client={queryClient}>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/bookmarks" component={BookmarksPage} />
                    <Redirect to="/bookmarks" />
                </IonRouterOutlet>
            </IonReactRouter>
        </QueryClientProvider>
    </IonApp>
);

export default App;
