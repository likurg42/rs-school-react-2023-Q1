import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import ProfileCard from './ProfileCard';
import { ProfileModel } from '../../../types/profile.model';

const mockProfile: ProfileModel = {
  id: '1',
  name: 'John Smitt',
  primaryLanguage: 'Javascript',
  opensource: true,
  experience: 'Junior',
  avatarUrl: 'https://picsum.photos/100/100',
  birthDate: new Date(),
  githubUrl: 'https://github.com/',
};

describe('profile card', () => {
  it('should render profile card', () => {
    render(<ProfileCard profile={mockProfile} />);
    const name = screen.queryByText(/John smitt/i);
    expect(name).toBeVisible();
  });
});
