import { routes } from './routes';

export const fetchRepositories = async (language: string, keyword: string) => {
  const params = {
    q: `${keyword}+language:${language}`,
    o: 'desc',
    sort: 'stars',
    page: '1',
    per_page: '20',
  };

  const searchParams = new URLSearchParams(params);
  const url = new URL(routes.githubApi.searchRepos());
  url.search = searchParams.toString();

  return fetch(url, {
    headers: {
      'User-Agent': 'request',
    },
  });
};
