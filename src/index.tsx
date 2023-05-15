import ReactDOM from 'react-dom/client';
import App from './App';
import './utils/i18n';
import './index.scss';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <App />
);

serviceWorkerRegistration.register({
  onUpdate: (registration: any) => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      registration.update();
    }
  }
});