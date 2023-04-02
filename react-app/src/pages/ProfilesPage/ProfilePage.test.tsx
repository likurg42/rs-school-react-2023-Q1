import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ProfilesPage } from './ProfilesPage';

describe('profile page', () => {
  it('should not submit', () => {
    render(<ProfilesPage />);

    const newProfile = screen.queryByText(/New Profile/i);
    expect(newProfile).toBeVisible();
  });
});
