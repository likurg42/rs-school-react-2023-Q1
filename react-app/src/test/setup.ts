import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockRepo } from './mocks/mockRepo';
import { routes } from '../common/routes';

const mockRepos: Repo[] = [mockRepo];

export const handlers = [
  rest.get(`${routes.githubApiUrl()}/*`, (_req, res, ctx) => res(ctx.json(mockRepos))),
];

export const server = setupServer(...handlers);

// Enable the API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable the API mocking after the tests finished.
afterAll(() => server.close());
