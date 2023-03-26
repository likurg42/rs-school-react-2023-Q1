import React from 'react';
import { ProfileModel } from '../../types/profile.model';
import ProfileForm from './ProfileForm/ProfileForm';

interface State {
  profiles: ProfileModel[];
}

export default class Profiles extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
  }

  render() {
    return <div className="grid">
      <ProfileForm/>
    </div>;
  }
}
