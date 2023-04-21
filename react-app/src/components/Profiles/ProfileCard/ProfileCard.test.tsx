import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ProfileCard } from './ProfileCard';
import { mockProfile } from '../../../test/mocks/mockProfile';
import { ProfileModel } from '../../../types/profile.model';

describe('profile card', () => {
  it('should render profile card', () => {
    render(<ProfileCard profile={mockProfile} />);
    const name = screen.getByText(/John smith/i);
    expect(name).toBeVisible();
  });
  it('should render profile card without opensource', () => {
    const mockProfileWithoutOpenSource: ProfileModel = { ...mockProfile, opensource: false };
    const { queryByText } = render(<ProfileCard profile={mockProfileWithoutOpenSource} />);
    expect(queryByText(/Open source/i)).toBeNull();
  });
});
