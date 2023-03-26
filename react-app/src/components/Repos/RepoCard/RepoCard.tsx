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
        className="flex h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 bg-gray-100 bg-opacity-75 p-4">
        <p className="flex flex-wrap justify-center gap-2">+
          {topics && topics.map((topic) => (
            <span
              className="text-xs font-medium tracking-widest text-gray-400 title-font"
              key={uuid()}>
            {topic}
          </span>
          ))}
          {topics?.length === 0 && <span
            className="text-xs font-medium tracking-widest text-gray-400 title-font">
            no tags
          </span>}
        </p>
        <h2 className="text-xl title-font sm:text-2xl">{name}</h2>
        <a
          href={html_url}
          target="_blank"
          className="text-cyan-500 underline"
          rel="noreferrer">
          {full_name}
        </a>
        <p className="text-center">{description}</p>
        <p className="flex items-center gap-2">
          {stargazers_count}
          <StarIcon className="h-4 w-4"/>
        </p>
      </div>
    );
  }
}
