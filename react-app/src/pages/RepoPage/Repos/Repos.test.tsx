import { render, screen } from '@testing-library/react';
import { it } from 'vitest';
import { mockRepo } from '../../../test/mocks/mockRepo';
import Repos from './Repos';
import RepoContextProvider from '../../../context/RepoContext';

const mockRepos: Repo[] = [mockRepo];

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({ items: mockRepos }),
    headers: new Headers(),
    redirected: false,
    status: 0,
    statusText: '',
    type: 'error',
    url: '',
    clone(): Response {
      throw new Error('Function not implemented.');
    },
    body: null,
    bodyUsed: false,
    arrayBuffer(): Promise<ArrayBuffer> {
      throw new Error('Function not implemented.');
    },
    blob(): Promise<Blob> {
      throw new Error('Function not implemented.');
    },
    formData(): Promise<FormData> {
      throw new Error('Function not implemented.');
    },
    text(): Promise<string> {
      throw new Error('Function not implemented.');
    }
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('should fetch  repos', async () => {
  render(
    <RepoContextProvider>
      <Repos />
    </RepoContextProvider>
  );
  const { name } = mockRepo;
  const renderedName = await screen.findByText(name);

  expect(renderedName).toBeInTheDocument();
});
