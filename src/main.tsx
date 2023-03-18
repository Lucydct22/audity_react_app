import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import './utils/i18n';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Auth0Provider
    domain={import.meta.env.VITE_APP_AUTH0_DOMAIN as string}
    clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID as string}
    authorizationParams={{ redirect_uri: window.location.origin + '/music' }}
  >
      <App />
  </Auth0Provider>
)