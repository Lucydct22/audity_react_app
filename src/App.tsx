import { TrackProvider } from "./context/currentTrack/TrackContext";
import { RouterProvider } from "react-router-dom";
import router from './router/router';
import { ThemeProvider } from "./context/theme/ThemeContext";
import { CurrentTracksListProvider } from "./context/currentTracksList/CurrentTracksListProvider";

const App = () => {
  return (
    <ThemeProvider>
      <CurrentTracksListProvider>
        <TrackProvider>
          <RouterProvider
            router={router}
            fallbackElement={<></>}
          />
        </TrackProvider>
      </CurrentTracksListProvider>
    </ThemeProvider>
  );
}

export default App;