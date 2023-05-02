import { RouterProvider } from "react-router-dom";
import router from './router/router';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from "./context/theme/ThemeContext";
import CurrentTracklistProvider from "./context/currentTracklist/CurrentTracklistProvider";
import CurrentTrackProvider from "./context/currentTrack/CurrentTrackProvider";
import { isLocalhost } from './utils/isLocalhost';
import UserProvider from "./context/user/UserProvider";

const App = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
      clientId={
        isLocalhost
          ? process.env.REACT_APP_DEVELOPMENT_AUTH0_CLIENT_ID as string
          : process.env.REACT_APP_PRODUCTION_AUTH0_CLIENT_ID as string
      }
      authorizationParams={{
        redirect_uri: window.location.origin + '/',
        audience: process.env.REACT_APP_AUTH0_AUDIENCE
      }}
    >
      <UserProvider>
        <ThemeProvider>
          <CurrentTracklistProvider>
            <CurrentTrackProvider>
              <RouterProvider
                router={router}
                fallbackElement={<></>}
              />
            </CurrentTrackProvider>
          </CurrentTracklistProvider>
        </ThemeProvider>
      </UserProvider>
    </Auth0Provider>
  );
}

export default App;