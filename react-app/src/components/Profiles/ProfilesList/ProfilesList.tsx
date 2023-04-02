import React from 'react';
import { ProfileModel } from '../../../types/profile.model';
import ProfileCard from '../ProfileCard/ProfileCard';

interface Props {
  profiles: ProfileModel[];
}

export default class ProfilesList extends React.Component<Props> {
  render() {
    const { profiles } = this.props;
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profiles && profiles.length > 0 ? profiles.map((profile) => (
          <React.Fragment key={profile.id}>
            <ProfileCard profile={profile} />
          </React.Fragment>
        )) : (
          <p>No profiles</p>
        )}
      </div>
    );
  }
}
