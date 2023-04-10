import { RepoFilter } from '../types/filter-repo';

const GITHUB_API = 'https://api.github.com';

const buildApiRoute = (
  path: string,
  filter: RepoFilter
) => {
  const q = Object.values(filter).filter((item) => item !== '').join('+');
  const params = {
    q,
    o: 'desc',
    sort: 'stars',
    page: '1',
    per_page: '20',
  };

  const searchParams = new URLSearchParams(params);
  const url = new URL(path, GITHUB_API);
  url.search = searchParams.toString();
  return url.toString();
};

export const routes = {
  githubApi: (filter: RepoFilter) => buildApiRoute('/search/repositories', filter),
};
