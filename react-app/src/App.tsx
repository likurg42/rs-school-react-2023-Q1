import React, { PropsWithChildren } from 'react';
import Header from './components/Header/Header';
import SearchForm from './components/Search/SearchForm';


interface State {
  currentLanguage: string;
}

export default class App extends React.Component<PropsWithChildren, State> {

  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      currentLanguage: localStorage.getItem('currentLanguage') || 'javascript',
    };
    this.setCurrentLanguage = this.setCurrentLanguage.bind(this);
  }


  setCurrentLanguage(language: string) {
    this.setState(() => ({
      currentLanguage: language,
    }));
    localStorage.setItem('currentLanguage', language);
  }

  render() {
    return (
      <div className="lg:container px-5 py-24 mx-auto text-gray-900">
        <Header>
          <SearchForm
            setCurrentLanguage={this.setCurrentLanguage}
            currentLanguage={this.state.currentLanguage}
          />
        </Header>
      </div>
    );
  }
}
