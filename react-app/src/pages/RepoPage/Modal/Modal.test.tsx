import { render, screen } from '@testing-library/react';
import { it } from 'vitest';
import Modal from './Modal';
import { mockRepo } from '../../../test/mocks/mockRepo';

it('should render modal', () => {
  render(<Modal repo={mockRepo} isOpen close={vi.fn()} />);
  const starGazers = screen.getByText(/9999/i);
  expect(starGazers).toBeVisible();
});
