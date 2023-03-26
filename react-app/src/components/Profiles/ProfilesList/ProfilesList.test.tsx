import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import ProfilesList from './ProfilesList';
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


const mockProfiles: ProfileModel[] = [mockProfile];


describe('profile list', () => {
  it('should render empty list', () => {
    render(<ProfilesList profiles={[]}/>);
    const noProfiles = screen.queryByText(/No Profiles/i);
    expect(noProfiles).toBeVisible();
  });

  it('should render profile list', () => {
    render(<ProfilesList profiles={mockProfiles}/>);
    const name = screen.queryByText(/John Smitt/i);
    expect(name).toBeVisible();

    const primaryLanguage = screen.queryByText(/Javascript/i);
    expect(primaryLanguage).toBeVisible();
  });
});
