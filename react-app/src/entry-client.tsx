import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { App } from './App';
import { store } from './store';
import './styles/index.css';

ReactDOM.hydrateRoot(
  (document.getElementById('root') as HTMLElement),
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>,
);
