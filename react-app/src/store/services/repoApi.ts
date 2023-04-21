import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GithubSearchParams, routes } from '../../common/routes';

export const repoApi = createApi({
  reducerPath: 'repoApi',
  keepUnusedDataFor: process.env.NODE_ENV === 'test' ? 0 : 60,
  baseQuery: fetchBaseQuery({ baseUrl: routes.api.root() }),
  endpoints: (build) => ({
    getRepos: build.query<{ items: Repo[]; }, GithubSearchParams>({
      query: (filter: GithubSearchParams) => ({
        url: routes.api.repositories(),
        method: 'GET',
        params: { ...filter },
      }),
    })
  })
});

export const { useGetReposQuery } = repoApi;
