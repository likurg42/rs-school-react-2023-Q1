import React from 'react';
import RepoCard from '../RepoCard/RepoCard';

interface Props {
  repos: Repo[] | RepoTest[];
}

export default class RepoList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { repos } = this.props;
    return <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {repos && repos.map((repo) => {
        return (
          <React.Fragment key={repo.id}>
            <RepoCard repo={repo}/>
          </React.Fragment>
        );
      })}
    </div>;

  }
}
