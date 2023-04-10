import { render, screen } from '@testing-library/react';
import { it } from 'vitest';
import { RepoList } from './RepoList';

const mockRepo: Repo = {
  id: 1,
  name: 'Some repo',
  description: 'You should starve',
  full_name: '@somedude/some-repo',
  html_url: 'https://my-repo.com',
  stargazers_count: '9999',
  topics: ['one', 'two', 'three'],
  forks_count: 999,
  size: 999,
  license: {
    name: 'Some license'
  },
  owner: {
    avatar_url: 'pic',
    login: 'name',
    type: 'user',
  }
};

const mockRepos: Repo[] = [mockRepo];

it('should render list', () => {
  render(<RepoList repos={mockRepos} />);

  const starGazers = screen.queryByText(/9999/i);

  expect(starGazers).toBeVisible();
});
