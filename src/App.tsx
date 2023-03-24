import { TrackProvider } from "./context/currentTrack/TrackContext";
import { RouterProvider } from "react-router-dom";
import router from './router/router';
import { ThemeProvider } from "./context/theme/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <TrackProvider>
        <RouterProvider
          router={router}
          fallbackElement={<></>}
        />
      </TrackProvider>
    </ThemeProvider>
  );
}

export default App;