import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ProfilesList } from './ProfilesList';
import { mockProfile } from '../../../test/mocks/mockProfile';
import { ProfileModel } from '../../../types/profile.model';

const mockProfiles: ProfileModel[] = [mockProfile];

describe('profile list', () => {
  it('should render empty list', () => {
    render(<ProfilesList profiles={[]} />);
    const noProfiles = screen.queryByText(/No Profiles/i);
    expect(noProfiles).toBeVisible();
  });

  it('should render profile list', () => {
    render(<ProfilesList profiles={mockProfiles} />);
    const name = screen.getByText(/John Smith/i);
    expect(name).toBeVisible();

    const primaryLanguage = screen.queryByText(/Javascript/i);
    expect(primaryLanguage).toBeVisible();
  });
});
