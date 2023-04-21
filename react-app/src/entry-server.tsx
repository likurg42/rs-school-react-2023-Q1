import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider as ReduxProvider } from 'react-redux/';
// import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { store } from './store';
import './styles/index.css';

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </ReduxProvider>,
  );
}
