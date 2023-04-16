import {
  StarIcon,
  ClipboardDocumentCheckIcon,
  ArrowUturnRightIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import {
  useCallback, useEffect, useRef
} from 'react';
import { v4 as uuid } from 'uuid';
import Button from '../../../components/Button/Button';

type Props = {
  repo: Repo | null;
  isOpen: boolean;
  toggle: (isOpen: boolean) => void;
};

const Modal = ({ repo, isOpen, toggle }: Props) => {
  const outside = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: Event) => {
    if (!outside.current?.contains(event.target as Node)) {
      toggle(false);
    }
  }, [toggle]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [repo, handleClickOutside]);

  const renderInfo = (currentRepo: Repo) => {
    const {
      topics,
      html_url,
      full_name,
      description,
      name,
      stargazers_count,
      size,
      license,
      forks_count,
      owner,
    } = currentRepo;

    const parsedDescription = description.length > 500
      ? description.slice(0, 500).concat('...')
      : description;

    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-xl title-font sm:text-2xl">{name}</h2>
        <p className="flex flex-wrap gap-2">
          {topics && topics.map((topic) => (
            <span
              className="text-xs font-medium tracking-widest text-gray-400 title-font"
              key={uuid()}
            >
              {topic}
            </span>
          ))}
          {topics?.length === 0 && (
            <span
              className="text-xs font-medium tracking-widest text-gray-400 title-font"
            >
              no tags
            </span>
          )}
        </p>
        <a
          href={html_url}
          target="_blank"
          className="text-cyan-500 underline"
          rel="noreferrer"
        >
          {full_name}
        </a>
        <p>{parsedDescription}</p>
        <p>{`Size: ${size} KB`}</p>
        <p className="flex items-center gap-2">
          {license && (
            <>
              <ClipboardDocumentCheckIcon className="h-4 w-4" />
              {license.name}
            </>
          )}
          <StarIcon className="h-4 w-4" />
          {stargazers_count}
          <ArrowUturnRightIcon className="h-4 w-4" />
          {forks_count}
        </p>
        <h2 className="text-2xl">
          Made by
        </h2>
        <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
          <div className="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
            <img className="rounded-lg object-cover shadow-lg" src={owner.avatar_url} alt="" />
          </div>
          <div className="sm:col-span-2">
            <div className="space-y-4">
              <div className="space-y-1 text-lg font-medium leading-6">
                <h3>{owner.login}</h3>
                <p className="text-indigo-600">{owner.type}</p>
              </div>
              <ul className="flex space-x-5">
                <li>
                  <a href={owner.html_url} className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Profile</span>
                    <UserIcon className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={clsx('z-50 w-screen  max-w-full h-screen fixed top-0 left-0 bg-indigo-300 bg-opacity-60 overflow-hidden justify-center items-center', {
        flex: isOpen,
        hidden: !isOpen,
      })}
    >
      <div
        className="block bg-white w-10/12 h-10/12 p-4 rounded-lg lg:w-6/12"
        ref={outside}
      >
        <p className="text-right">
          <Button onClick={() => toggle(false)}>Close</Button>
        </p>
        {repo && renderInfo(repo)}
      </div>
    </div>
  );
};

export default Modal;
