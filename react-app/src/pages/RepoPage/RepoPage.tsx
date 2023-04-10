import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SearchForm } from './SearchForm/SearchForm';
import { Hero } from './Hero/Hero';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Repos from './Repos/Repos';

export const RepoPage = () => (
  <>
    <Hero>
      <SearchForm />
    </Hero>
    <main>
      <ErrorBoundary fallback={(
        <p>
          Too many requests, so github api blocks you for couple of minutes
        </p>
      )}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Repos />
        </Suspense>
      </ErrorBoundary>
    </main>
  </>
);
