import React from 'react';
import { RepoFetch } from './RepoFetch/RepoFetch';

interface Props {
  currentLanguage: string,
  currentKeyword: string,
}

export const Repos = (props: Props) => {
  const { currentKeyword, currentLanguage } = props;
  return <RepoFetch currentLanguage={currentLanguage} currentKeyword={currentKeyword} />;
};
