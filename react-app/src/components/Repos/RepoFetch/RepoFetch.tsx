import React from 'react';
import RepoList from '../RepoList/RepoList';
import { fetchRepositories } from '../../../common/fetchRepositories';

interface Props {
  currentLanguage?: string;
  currentKeyword?: string;
}

interface State {
  repos: Repo[],
  fetchStatus: 'idle' | 'loading' | 'error',
}

export default class RepoFetch extends React.Component<Props, State> {
  // eslint-disable-next-line react/static-property-placement
  declare readonly props: Props &
  Required<Pick<Props, keyof typeof RepoFetch.defaultProps>>;

  static defaultProps: Props = {
    currentLanguage: 'javascript',
    currentKeyword: 'react',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      repos: [],
      fetchStatus: 'loading',
    };
  }

  async componentDidMount() {
    const { currentKeyword, currentLanguage } = this.props;
    await this.fetchRepos(currentLanguage, currentKeyword);
  }

  async componentDidUpdate(prevProps: Readonly<Props>) {
    const { currentKeyword, currentLanguage } = this.props;

    if (
      prevProps.currentLanguage !== currentLanguage
      || prevProps.currentKeyword !== currentKeyword
    ) {
      await this.fetchRepos(currentLanguage, currentKeyword);
    }
  }

  async fetchRepos(language: string, keyword: string) {
    this.setState((state) => ({ ...state, fetchStatus: 'loading' }));
    let res;

    try {
      res = await fetchRepositories(language, keyword);
    } catch (e) {
      this.setState(() => ({ repos: [], fetchStatus: 'error' }));
    }

    if (res?.ok) {
      const data: SearchResult = await res.json();
      const { items } = data;

      this.setState(() => ({
        repos: items,
        fetchStatus: 'idle',
      }));
    } else {
      this.setState(() => ({ fetchStatus: 'error' }));
    }
  }

  render() {
    const { repos, fetchStatus } = this.state;
    return (
      <>
        {fetchStatus === 'loading' && (
          <div role="status">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              aria-hidden="true"
              viewBox="0 0 100 101"
              className="mx-auto h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            >
              <path
                fill="currentColor"
                d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50Zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919Z"
              />
              <path
                fill="currentFill"
                d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0 0 41.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0 1 44.131 25.769c.902 2.34 3.361 3.802 5.787 3.165Z"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {fetchStatus === 'idle' && (
          <RepoList repos={repos} />
        )}
        {fetchStatus === 'error' && <h2 className="text-center">Nothing was found</h2>}
      </>

    );
  }
}
