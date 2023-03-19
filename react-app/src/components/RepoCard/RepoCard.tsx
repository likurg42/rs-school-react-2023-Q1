import React from 'react';
import { v4 as uuid } from 'uuid';
import { StarIcon } from '@heroicons/react/24/solid';

interface Props {
  repo: Repo | RepoTest;
}

export default class RepoCard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      name,
      description,
      full_name,
      html_url,
      stargazers_count,
      topics,
    } = this.props.repo;
    return (
      <div
        className="h-full p-4 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden flex flex-col gap-2 bg-gray-100 bg-opacity-75 items-center justify-center">
        <p className="flex gap-2 flex-wrap justify-center">
          {topics && topics.map((topic) => (
            <span
              className="tracking-widest text-xs title-font font-medium text-gray-400"
              key={uuid()}>
            {topic}
          </span>
          ))}
          {topics?.length === 0 && <span
            className="tracking-widest text-xs title-font font-medium text-gray-400"
            key={uuid()}>
            no tags
          </span>}
        </p>
        <h2 className="title-font sm:text-2xl text-xl">{name}</h2>
        <a
          href={html_url}
          target="_blank"
          className="text-cyan-500 underline"
          rel="noreferrer">
          {full_name}
        </a>
        <p className="text-center">{description}</p>
        <p className="flex gap-2 items-center">
          {stargazers_count}
          <StarIcon className="h-4 w-4"/>
        </p>
      </div>
    );
  }
}
