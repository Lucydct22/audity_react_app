import { RouterProvider } from "react-router-dom";
import router from './router/router';
import { ThemeProvider } from "./context/theme/ThemeContext";
import { CurrentTracksListProvider } from "./context/currentTracksList/CurrentTracksListProvider";
import CurrentTrackProvider from "./context/currentTrack/CurrentTrackProvider";

const App = () => {
  return (
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
  );
}

export default App;