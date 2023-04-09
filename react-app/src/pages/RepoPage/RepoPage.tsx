import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { SearchForm } from './SearchForm/SearchForm';
import { Hero } from './Hero/Hero';
import useRepoContext from '../../hooks/useRepoContext';
import { routes } from '../../common/routes';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { RepoList } from './RepoList/RepoList';

type Response = {
  items: Repo[];
};

export const RepoPage = () => {
  const { filter } = useRepoContext();
  const { keyword, language } = filter;
  const url = useMemo(() => routes.githubApi(keyword, language), [keyword, language]);
  const [state, setState] = useState<{ status: string; content?: Repo[]; }>({
    status: 'idle',
  });
  const { status } = state;

  useEffect(() => {
    let isActual = true;

    const load = async () => {
      setState((prevState) => ({ ...prevState, status: 'loading' }));
      try {
        const res = await axios.get<Response>(url);
        if (isActual) setState({ status: 'idle', content: res.data.items });
      } catch (e) {
        setState((prevState) => ({ ...prevState, status: 'error' }));
      }
    };

    load();

    return () => {
      isActual = false;
    };
  }, [url]);

  return (
    <>
      <Hero>
        <SearchForm />
      </Hero>
      <main>
        {status === 'loading' && <LoadingSpinner />}
        {status === 'error' && <h2 className="text-center">Error getting repositories</h2>}
        {status === 'idle' && state.content && <RepoList repos={state.content} />}
        {status === 'idle' && state.content && state.content.length === 0 && <h2 className="text-center">No repositories found</h2>}
      </main>
    </>
  );
};
