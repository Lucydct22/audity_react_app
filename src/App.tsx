import { RouterProvider } from "react-router-dom";
import router from './router/router';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from "./context/theme/ThemeContext";
import CurrentTracklistProvider from "./context/currentTracklist/CurrentTracklistProvider";
import CurrentTrackProvider from "./context/currentTrack/CurrentTrackProvider";
import { isLocalhost } from './utils/isLocalhost';
import UserProvider from "./context/user/UserProvider";
import { LanguageProvider } from "context/language/LanguageContext";
import MyLibraryProvider from "context/myLibrary/MyLibraryProvider";

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
        audience: isLocalhost
          ? process.env.REACT_APP_AUTH0_AUDIENCE_DEVELOPMENT
          : process.env.REACT_APP_AUTH0_AUDIENCE_PRODUCTION
      }}
    >
      <UserProvider>
        <LanguageProvider>
          <ThemeProvider>
            <CurrentTracklistProvider>
              <CurrentTrackProvider>
                <MyLibraryProvider>
                  <RouterProvider
                    router={router}
                    fallbackElement={<></>}
                  />
                </MyLibraryProvider>
              </CurrentTrackProvider>
            </CurrentTracklistProvider>
          </ThemeProvider>
        </LanguageProvider>
      </UserProvider>
    </Auth0Provider>
  );
}

export default App;