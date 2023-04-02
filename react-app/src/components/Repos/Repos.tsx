import React from 'react';
import RepoFetch from './RepoFetch/RepoFetch';

interface Props {
  currentLanguage: string,
  currentKeyword: string,
}

export default class Repos extends React.Component<Props> {
  render() {
    const { currentKeyword, currentLanguage } = this.props;
    return <RepoFetch currentLanguage={currentLanguage} currentKeyword={currentKeyword} />;
  }
}
