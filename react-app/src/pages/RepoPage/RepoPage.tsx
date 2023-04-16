import { ErrorBoundary } from 'react-error-boundary';
import { SearchForm } from './SearchForm/SearchForm';
import { Hero } from './Hero/Hero';
import Repos from './Repos/Repos';

export const RepoPage = () => (
  <>
    <Hero>
      <SearchForm />
    </Hero>
    <main>
      <ErrorBoundary fallback={(
        <p>Too many requests, so github api blocks you for couple of minutes</p>
      )}
      >
        <Repos />
      </ErrorBoundary>
    </main>
  </>
);
