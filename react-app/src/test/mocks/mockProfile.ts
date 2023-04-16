import { ProfileModel } from '../../types/profile.model';

export const mockProfile: ProfileModel = {
  id: '1',
  name: 'John Smith',
  primaryLanguage: 'Javascript',
  opensource: true,
  experience: 'Junior',
  avatarUrl: 'https://picsum.photos/100/100',
  birthDate: new Date(),
  githubUrl: 'https://github.com/',
};
