import { SearchForm } from './SearchForm/SearchForm';
import { Hero } from './Hero/Hero';
import Repos from './Repos/Repos';

export const RepoPage = () => (
  <>
    <Hero>
      <SearchForm />
    </Hero>
    <main>
      <Repos />
    </main>
  </>
);
