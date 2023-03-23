import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { isLocalhost } from './utils/isLocalhost';
import './utils/i18n';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
    clientId={
      isLocalhost
        ? import.meta.env.VITE_DEVELOPMENT_AUTH0_CLIENT_ID as string
        : import.meta.env.VITE_PRODUCTION_AUTH0_CLIENT_ID as string
    }
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <App />
  </Auth0Provider>
)