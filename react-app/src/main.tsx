import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/index.css';
import RepoContextProvider from './context/RepoContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RepoContextProvider>
    <App />
  </RepoContextProvider>,
);
