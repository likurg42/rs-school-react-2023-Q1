const GITHUB_API = 'https://api.github.com';

export const routes = {
  githubApi: {
    searchRepos: () => [GITHUB_API, 'search/repositories'].join('/'),
  },
};
