import React from 'react';
import { LinkIcon } from '@heroicons/react/24/solid';
import { ProfileModel } from '../../../types/profile.model';
import { getAge } from '../../../utils/validation';
import defaultAvatar from './default-avatar.png';

interface Props {
  profile: ProfileModel;
}

export const ProfileCard = (props: Props) => {
  const { profile } = props;
  const {
    name,
    primaryLanguage,
    experience,
    opensource,
    avatarUrl,
    birthDate,
    githubUrl,
  } = profile;

  const description = `${primaryLanguage}${opensource ? ' Open source' : ' '} ${experience} developer`;

  const age = `${getAge(birthDate.toDateString())} years old`;
  const avatarSrc = avatarUrl ?? defaultAvatar;

  return (
    <article
      className="flex flex-col gap-2 rounded-lg border-2 border-gray-200 border-opacity-60 bg-gray-100 bg-opacity-75 p-4 "
    >
      <header className="flex flex-col gap-4">
        <span className="flex gap-4 items-center overflow-hidden">
          <img src={avatarSrc} alt="avatar" className="w-12 h-12 rounded-lg" />
          <h3 className="text-2xl">{name}</h3>
        </span>
        <b>{age}</b>
      </header>
      <p>{description}</p>
      <a href={githubUrl} className="w-4 h-4">
        <LinkIcon />
      </a>
    </article>
  );
};
