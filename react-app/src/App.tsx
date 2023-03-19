import React, { PropsWithChildren } from 'react';
import Header from './components/Header/Header';
import SearchForm from './components/SearchForm/SearchForm';
import RepoList from './components/RepoList/RepoList';


interface State {
  currentLanguage: string;
  currentKeyword: string;
}

export default class App extends React.Component<PropsWithChildren, State> {

  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      currentLanguage: localStorage.getItem('currentLanguage') || 'javascript',
      currentKeyword: localStorage.getItem('currentKeyword') || '',
    };
    this.setCurrentQueryParams = this.setCurrentQueryParams.bind(this);
  }


  setCurrentQueryParams(params: { language: string, keyword: string }) {
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
      <div className="lg:container px-5 py-24 mx-auto text-gray-900">
        <Header>
          <SearchForm
            setCurrentLanguage={this.setCurrentQueryParams}
            currentLanguage={currentLanguage}
            currentKeyword={currentKeyword}
          />
        </Header>
        <main>
          <RepoList currentLanguage={currentLanguage} currentKeyword={currentKeyword}/>
        </main>
      </div>
    );
  }
}
