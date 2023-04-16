import { Provider as ReduxProvider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { store } from './store';
import { App } from './App';
import './styles/index.css';
import RepoContextProvider from './context/RepoContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReduxProvider store={store}>
    <RepoContextProvider>
      <App />
    </RepoContextProvider>
  </ReduxProvider>
);
