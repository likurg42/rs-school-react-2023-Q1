import { useCallback } from 'react';
import { v4 as genId } from 'uuid';
import { ProfileForm } from './ProfileForm/ProfileForm';
import { ProfilesList } from './ProfilesList/ProfilesList';
import { ProfileFormModel } from '../../types/profileForm.model';
import { useProfile } from '../../hooks/useProfile';

export const Profiles = () => {
  const { addProfile: adddProfile, profileList } = useProfile();

  const createProfile = useCallback((profileFormValues: ProfileFormModel): void => {
    const { birthDate, avatarUrl } = profileFormValues;

    const profile = {
      ...profileFormValues,
      id: genId(),
      avatarUrl: avatarUrl === '' ? null : avatarUrl,
      birthDate: new Date(birthDate).toString(),
    };

    adddProfile(profile);
  }, [adddProfile]);

  return (
    <div className="flex flex-wrap gap-8 sm:flex-nowrap">
      <div className="basis-full sm:basis-1/4 lg:basis-1/3">
        <ProfileForm submit={createProfile} />
      </div>
      <div className="basis-full flex-grow">
        <ProfilesList profiles={profileList} />
      </div>
    </div>
  );
};
