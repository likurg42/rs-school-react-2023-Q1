import React, { useCallback, useState } from 'react';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { Hero } from '../../components/Hero/Hero';
import { Repos } from '../../components/Repos/Repos';

interface State {
  currentLanguage: string;
  currentKeyword: string;
}

export const MainPage = () => {
  const [state, setState] = useState<State>({
    currentLanguage: localStorage.getItem('currentLanguage') || 'javascript',
    currentKeyword: localStorage.getItem('currentKeyword') || 'react',
  });

  const setCurrentQueryParams = useCallback((params: { language: string, keyword: string; }) => {
    const { language, keyword } = params;
    setState(() => ({
      currentLanguage: language,
      currentKeyword: keyword,
    }));
    localStorage.setItem('currentLanguage', language);
    localStorage.setItem('currentKeyword', keyword);
  }, []);

  const { currentLanguage, currentKeyword } = state;
  return (
    <>
      <Hero>
        <SearchForm
          setCurrentLanguage={setCurrentQueryParams}
          currentLanguage={currentLanguage}
          currentKeyword={currentKeyword}
        />
      </Hero>
      <main>
        <Repos
          currentLanguage={currentLanguage}
          currentKeyword={currentKeyword}
        />
      </main>
    </>
  );
};
