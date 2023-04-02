import React, { PropsWithChildren } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import Hero from '../../components/Hero/Hero';
import Repos from '../../components/Repos/Repos';

interface State {
  currentLanguage: string;
  currentKeyword: string;
}

export default class MainPage extends React.Component<PropsWithChildren, State> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      currentLanguage: localStorage.getItem('currentLanguage') || 'javascript',
      currentKeyword: localStorage.getItem('currentKeyword') || 'react',
    };
    this.setCurrentQueryParams = this.setCurrentQueryParams.bind(this);
  }

  setCurrentQueryParams(params: { language: string, keyword: string; }) {
    const { language, keyword } = params;
    this.setState(() => ({
      currentLanguage: language,
      currentKeyword: keyword,
    }));
    localStorage.setItem('currentLanguage', language);
    localStorage.setItem('currentKeyword', keyword);
  }

  render() {
    const { currentLanguage, currentKeyword } = this.state;
    return (
      <div className="mx-auto px-5 text-gray-900 lg:container">
        <Hero>
          <SearchForm
            setCurrentLanguage={this.setCurrentQueryParams}
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
      </div>
    );
  }
}
