import React from 'react';
import RepoCard from '../RepoCard/RepoCard';

interface Props {
  currentLanguage: string;
  currentKeyword: string;
}

interface State {
  repos: Repo[],
  fetchStatus: 'idle' | 'loading' | 'error',
}

export default class RepoList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      repos: [],
      fetchStatus: 'loading',
    };
  }

  async fetchRepos(language: string, keyword: string) {
    this.setState((state) => ({ ...state, fetchStatus: 'loading' }));

    try {
      const data = await fetch(`https://api.github.com/search/repositories?o=desc&q=${keyword || ''}+language:${language}&sort=stars&page=1&per_page=20`, {
        headers: {
          'User-Agent': 'request',
        },
      });

      if (data.status === 422 || data.status === 403) {
        throw new Error('Validation Error');
      }

      const parsedData: SearchResult = await data.json();
      const { items } = parsedData;

      this.setState(() => ({
        repos: items,
        fetchStatus: 'idle',
      }));
    } catch (e) {
      this.setState(() => ({ repos: [], 'fetchStatus': 'error' }));
    }
  }

  componentDidMount() {
    const { currentKeyword, currentLanguage } = this.props;
    this.fetchRepos(currentLanguage, currentKeyword);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    const { currentKeyword, currentLanguage } = this.props;

    if (
      prevProps.currentLanguage !== currentLanguage
      || prevProps.currentKeyword !== currentKeyword
    ) {
      this.fetchRepos(currentLanguage, currentKeyword);
    }
  }

  render() {
    const { repos, fetchStatus } = this.state;
    return (
      <React.Fragment>
        {fetchStatus === 'loading' && (
          <div role="status">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true"
                 viewBox="0 0 100 101"
                 className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto">
              <path fill="currentColor"
                    d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50Zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919Z"/>
              <path fill="currentFill"
                    d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0 0 41.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0 1 44.131 25.769c.902 2.34 3.361 3.802 5.787 3.165Z"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {fetchStatus === 'idle' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo) => {
              return (
                <React.Fragment key={repo.id}>
                  <RepoCard repo={repo}/>
                </React.Fragment>
              );
            })}
          </div>
        )}

        {fetchStatus === 'error' && <h2 className="text-center">Nothing was found</h2>}
      </React.Fragment>

    );
  }
}
