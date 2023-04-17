import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  fetch, Headers, Request, Response
} from 'cross-fetch';
import { mockRepo } from './mocks/mockRepo';
import { routes } from '../common/routes';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

const mockRepos: Repo[] = [mockRepo];

export const handlers = [
  rest.get(routes.api.repositories(true), (req, res, ctx) => res(ctx.json({ items: mockRepos }))),
];

export const server = setupServer(...handlers);

// Enable the API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable the API mocking after the tests finished.
afterAll(() => server.close());
