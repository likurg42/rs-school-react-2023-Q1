const GITHUB_API = 'https://api.github.com';

const buildApiRoute = (
  path: string,
  { keyword, language }: { keyword: string, language: string; }
) => {
  const q = [keyword, language].filter((item) => item !== '').join('+');
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
  githubApi: (keyword: string, language: string) => buildApiRoute('/search/repositories', { keyword, language }),
};
