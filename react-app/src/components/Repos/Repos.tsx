import React from 'react';
import RepoFetch from './RepoFetch/RepoFetch';

export default class Repos extends React.Component<unknown> {
  constructor(props: unknown) {
    super(props);
  }

  render() {
    return <RepoFetch currentLanguage="javascript" currentKeyword=""/>;
  }
}
