import React from 'react';
import { v4 as genId } from 'uuid';
import { ProfileModel } from '../../types/profile.model';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfilesList from './ProfilesList/ProfilesList';
import { ProfileFormModel } from '../../types/profileForm.model';

interface State {
  profiles: ProfileModel[];
}

export default class Profiles extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      profiles: [],
    };

    this.addProfile = this.addProfile.bind(this);
  }

  addProfile(profileFormValues: ProfileFormModel): void {
    const { birthDate, avatarUrl } = profileFormValues;

    const profile = {
      ...profileFormValues,
      id: genId(),
      avatarUrl: avatarUrl === '' ? null : avatarUrl,
      birthDate: new Date(birthDate),
    };

    this.setState((state) => ({
      profiles: [...state.profiles, profile],
    }));
  }

  render() {
    const { profiles } = this.state;
    return (
      <div className="flex flex-wrap gap-8 sm:flex-nowrap">
        <div className="basis-full sm:basis-1/4 lg:basis-1/3">
          <ProfileForm submit={this.addProfile} />
        </div>
        <div className="basis-full flex-grow">
          <ProfilesList profiles={profiles} />
        </div>
      </div>
    );
  }
}
