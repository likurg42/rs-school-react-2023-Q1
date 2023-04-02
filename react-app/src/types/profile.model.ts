export interface ProfileModel {
  id: string;
  name: string;
  birthDate: Date;
  primaryLanguage: string;
  opensource: boolean;
  experience: string;
  avatarUrl: string | null;
  githubUrl: string;
}
