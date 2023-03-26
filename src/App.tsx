import { RouterProvider } from "react-router-dom";
import router from './router/router';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from "./context/theme/ThemeContext";
import { CurrentTracksListProvider } from "./context/currentTracksList/CurrentTracksListProvider";
import CurrentTrackProvider from "./context/currentTrack/CurrentTrackProvider";
import { isLocalhost } from './utils/isLocalhost';

const App = () => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
      clientId={
        isLocalhost
          ? import.meta.env.VITE_DEVELOPMENT_AUTH0_CLIENT_ID as string
          : import.meta.env.VITE_PRODUCTION_AUTH0_CLIENT_ID as string
      }
      authorizationParams={{ redirect_uri: window.location.origin + '/' }}
    >
      <ThemeProvider>
        <CurrentTracksListProvider>
          <CurrentTrackProvider>
            <RouterProvider
              router={router}
              fallbackElement={<></>}
            />
          </CurrentTrackProvider>
        </CurrentTracksListProvider>
      </ThemeProvider>
    </Auth0Provider>
  );
}

export default App;