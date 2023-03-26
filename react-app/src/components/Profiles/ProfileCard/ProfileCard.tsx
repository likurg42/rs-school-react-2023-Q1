import React from 'react';
import { ProfileModel } from '../../../types/profile.model';

interface Props {
  profile: ProfileModel;
}

export default class ProfileCard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { name, primaryLanguage, experience, opensource, avatarUrl } = this.props.profile;
    const description = `${primaryLanguage}${opensource ? ' Open source' : ' '} ${experience} developer`;
    return (
      <article
        className="flex flex-col gap-2 rounded-lg border-2 border-gray-200 border-opacity-60 bg-gray-100 bg-opacity-75 p-4 ">
        <header className="flex gap-4 items-center overflow-hidden">
          <img src={avatarUrl} alt="avatar" className="w-8 h-8 rounded-lg"/>
          <h3 className="text-2xl">{name}</h3>
        </header>
        <p>{description}</p>
      </article>
    );
  }
}
