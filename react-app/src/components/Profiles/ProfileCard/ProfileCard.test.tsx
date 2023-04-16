import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ProfileCard } from './ProfileCard';
import { mockProfile } from '../../../test/mocks/mockProfile';

describe('profile card', () => {
  it('should render profile card', () => {
    render(<ProfileCard profile={mockProfile} />);
    const name = screen.getByText(/John smith/i);
    expect(name).toBeVisible();
  });
});
