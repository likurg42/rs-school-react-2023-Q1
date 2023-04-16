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

const buildApiRoute = (
  path: string,
  filter: RepoFilter
) => {
  const params = buildSearchParams(filter);
  const searchParams = new URLSearchParams(params);
  const url = new URL(path, GITHUB_API);
  url.search = searchParams.toString();
  return url.toString();
};

export const routes = {
  githubApiUrl: () => GITHUB_API,
  githubApiRepoPath: () => 'search/repositories',
  githubApi: (filter: RepoFilter = { keyword: '', language: 'javascript' }) => buildApiRoute('/search/repositories', filter),
};
