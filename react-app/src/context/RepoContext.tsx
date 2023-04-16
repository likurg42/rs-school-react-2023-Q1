import {
  createContext, PropsWithChildren, useCallback, useMemo, useState,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { RepoFilter } from '../types/filter-repo';

type RepoContextValue = {
  filter: RepoFilter,
  updateFilter: (newFilter: RepoFilter) => void;
};

export const RepoContext = createContext<RepoContextValue | null>(null);

const initialValues = { keyword: '', language: 'javascript' };

const RepoContextProvider = ({ children }: PropsWithChildren) => {
  const [storedFilter, setStoredFilter] = useLocalStorage<RepoFilter>('repoFilter', useMemo(() => initialValues, []));

  const [filter, setFilter] = useState<RepoFilter>({
    keyword: storedFilter.keyword,
    language: storedFilter.language
  });

  const updateFilter = useCallback((newFilter: RepoFilter) => {
    setStoredFilter(newFilter);
    setFilter((prevState) => ({
      ...prevState,
      ...newFilter,
    }));
  }, [setStoredFilter]);

  const contextValue = useMemo(() => ({
    filter,
    updateFilter,
  }), [filter, updateFilter]);

  return (
    <RepoContext.Provider value={contextValue}>
      {children}
    </RepoContext.Provider>
  );
};

export default RepoContextProvider;
