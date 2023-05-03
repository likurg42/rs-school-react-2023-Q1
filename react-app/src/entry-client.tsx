import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PreloadedState } from '@reduxjs/toolkit';
import { App } from './App';
import { setupStore, RootState } from './store';
import './styles/index.css';

declare global {
  interface Window {
    __PRELOADED_STATE__?: PreloadedState<RootState>;
  }
}

const store = setupStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

ReactDOM.hydrateRoot(
  (document.getElementById('root') as HTMLElement),
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>,
);
