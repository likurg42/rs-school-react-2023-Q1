import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GithubSearchParams, routes } from '../common/routes';

export const repoApi = createApi({
  reducerPath: 'repoApi',
  baseQuery: fetchBaseQuery({ baseUrl: routes.githubApiUrl() }),
  endpoints: (build) => ({
    getRepos: build.query<{ items: Repo[]; }, GithubSearchParams>({
      query: (filter: GithubSearchParams) => ({
        url: routes.githubApiRepoPath(),
        method: 'GET',
        params: { ...filter },
      }),
    })
  })
});

export const { useGetReposQuery } = repoApi;
