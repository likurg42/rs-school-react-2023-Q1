import React from 'react';
import Profiles from '../../components/Profiles/Profiles';

export default class ProfilesPage extends React.Component<unknown> {
  constructor(props: unknown) {
    super(props);
  }

  render() {
    return (
      <div className="mx-auto px-5 text-gray-900 lg:container">
        <div className="flex flex-wrap gap-12">
          <Profiles/>
        </div>
      </div>
    );
  }
}
