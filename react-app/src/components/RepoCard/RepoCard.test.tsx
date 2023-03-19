import { render, screen } from '@testing-library/react';
import { it } from 'vitest';
import RepoCard from './RepoCard';

const mockRepo: RepoTest = {
  name: 'Some repo',
  description: 'You should starve',
  full_name: '@somedude/some-repo',
  html_url: 'https://my-buttocks.com',
  stargazers_count: '9999',
  topics: ['one', 'two', 'three'],
};

it('should render card', () => {
  render(<RepoCard repo={mockRepo}/>);
  const starGazers = screen.queryByText(/9999/i);
  expect(starGazers).toBeVisible();
});
