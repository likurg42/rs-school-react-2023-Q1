import {
  createContext, PropsWithChildren, useCallback, useMemo, useState,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

type RepoFilter = {
  keyword: string;
  language: string;
};

type RepoContextValue = {
  filter: RepoFilter,
  updateFilter: (newFilter: RepoFilter) => void;
};

export const RepoContext = createContext<RepoContextValue | null>(null);

const inititalValues = { keyword: '', language: 'javascript' };

const RepoContextProvider = ({ children }: PropsWithChildren) => {
  const [keywordStored, setKeywordStored] = useLocalStorage<string>('repoFilter.keyword', inititalValues.keyword);
  const [languageStored, setLanguageStored] = useLocalStorage<string>('repoFilter.language', inititalValues.keyword);
  const [filter, setFilter] = useState<RepoFilter>({
    keyword: keywordStored,
    language: languageStored
  });

  const updateFilter = useCallback((newFilter: RepoFilter) => {
    setLanguageStored(newFilter.language);
    setKeywordStored(newFilter.keyword);
    setFilter((prevState) => ({
      ...prevState,
      ...newFilter,
    }));
  }, [setKeywordStored, setLanguageStored]);

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
