import { render, screen } from '@testing-library/react';
import { it } from 'vitest';
import { RepoList } from './RepoList';
import { mockRepo } from '../../../test/mocks/mockRepo';

const mockRepos: Repo[] = [mockRepo];

it('should render list', () => {
  render(<RepoList repos={mockRepos} />);

  const starGazers = screen.queryByText(/9999/i);

  expect(starGazers).toBeVisible();
});
