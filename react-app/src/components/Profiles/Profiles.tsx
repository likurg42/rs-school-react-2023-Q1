import React from 'react';
import { ProfileModel } from '../../types/profile.model';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfilesList from './ProfilesList/ProfilesList';
import { ProfileFormModel } from '../../types/profileForm.model';
import { v4 as genId } from 'uuid';

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
    const { birthDate, opensource } = profileFormValues;

    console.log(opensource);
    const profile = {
      id: genId(),
      ...profileFormValues,
      birthDate: new Date(birthDate),
    };

    this.setState((state) => {
      return {
        profiles: [...state.profiles, profile],
      };
    });
  }

  render() {
    const { profiles } = this.state;
    return <div className="flex flex-wrap gap-8 md:flex-nowrap md:gap-0">
      <div className="basis-1/3">
        <ProfileForm submit={this.addProfile}/>
      </div>
      <div className="basis-2/3 flex-grow">
        <ProfilesList profiles={profiles}/>
      </div>
    </div>;
  }
}
