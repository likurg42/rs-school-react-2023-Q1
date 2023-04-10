import { render, screen } from '@testing-library/react';
import { it } from 'vitest';
import Modal from './Modal';

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

it('should render modal', () => {
  render(<Modal repo={mockRepo} isOpen toggle={vi.fn()} />);
  const starGazers = screen.queryByText(/9999/i);
  expect(starGazers).toBeVisible();
});
