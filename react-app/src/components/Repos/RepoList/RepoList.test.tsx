import { render, screen } from '@testing-library/react';
import { it } from 'vitest';
import RepoList from './RepoList';

const mockRepo: RepoTest = {
  id: 1,
  name: 'Some repo',
  description: 'You should starve',
  full_name: '@somedude/some-repo',
  html_url: 'https://my-repo.com',
  stargazers_count: '9999',
  topics: ['one', 'two', 'three'],
};


const mockRepos: RepoTest[] = [mockRepo];

it('should render list', () => {
  render(<RepoList repos={mockRepos}/>);
  const starGazers = screen.queryByText(/9999/i);
  expect(starGazers).toBeVisible();
});
