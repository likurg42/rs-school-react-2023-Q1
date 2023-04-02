import React, { useCallback, useState } from 'react';
import { v4 as genId } from 'uuid';
import { ProfileModel } from '../../types/profile.model';
import { ProfileForm } from './ProfileForm/ProfileForm';
import { ProfilesList } from './ProfilesList/ProfilesList';
import { ProfileFormModel } from '../../types/profileForm.model';

interface State {
  profiles: ProfileModel[];
}

export const Profiles = () => {
  const [state, setState] = useState<State>({
    profiles: [],
  });

  const addProfile = useCallback((profileFormValues: ProfileFormModel): void => {
    const { birthDate, avatarUrl } = profileFormValues;

    const profile = {
      ...profileFormValues,
      id: genId(),
      avatarUrl: avatarUrl === '' ? null : avatarUrl,
      birthDate: new Date(birthDate),
    };

    setState((prevState) => ({
      profiles: [...prevState.profiles, profile],
    }));
  }, []);

  const { profiles } = state;
  return (
    <div className="flex flex-wrap gap-8 sm:flex-nowrap">
      <div className="basis-full sm:basis-1/4 lg:basis-1/3">
        <ProfileForm submit={addProfile} />
      </div>
      <div className="basis-full flex-grow">
        <ProfilesList profiles={profiles} />
      </div>
    </div>
  );
};
