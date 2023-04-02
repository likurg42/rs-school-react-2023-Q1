import React from 'react';
import Profiles from '../../components/Profiles/Profiles';

export default class ProfilesPage extends React.Component<unknown> {
  render() {
    return (
      <div className="mx-auto px-5 text-gray-900 lg:container mb-8">
        <Profiles />
      </div>
    );
  }
}
