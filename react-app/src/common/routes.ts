import { RepoFilter } from '../types/filter-repo';

export const GITHUB_API = 'https://api.github.com';

export type GithubSearchParams = {
  q: string,
  o: string,
  sort: string,
  page: string,
  per_page: string,
};

export const buildSearchParams = (filter: RepoFilter) => {
  const q = Object.values(filter).filter((item) => item !== '').join('+');
  const params = {
    q,
    o: 'desc',
    sort: 'stars',
    page: '1',
    per_page: '20',
  };
  return params;
};

export const routes = {
  api: {
    root: () => GITHUB_API,
    repositories: (isFull = false) => (isFull ? `${new URL('search/repositories', GITHUB_API)}` : 'search/repositories'),
  }
};
