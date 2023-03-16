import { RouterProvider } from "react-router-dom";
import router from './router/router';

const App = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<div>Loading</div>}
    />
  );
}

export default App;