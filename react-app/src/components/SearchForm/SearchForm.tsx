import React, { ChangeEvent, PropsWithChildren } from 'react';

interface Props {
  setCurrentLanguage: (params: { language: string, keyword: string }) => void;
  currentLanguage: string;
  currentKeyword: string;
}

interface State {
  form: {
    language: string,
    keyword: string,
  };
}

export default class SearchForm extends React.Component<PropsWithChildren<Props>, State> {
  constructor(props: Props) {
    super(props);
    const language = localStorage.getItem('language') || props.currentLanguage;
    const keyword = localStorage.getItem('keyword') || props.currentKeyword;
    this.state = {
      form: {
        language,
        keyword,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { language, keyword } = this.state.form;
    this.props.setCurrentLanguage({ language, keyword });
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    this.setState((s) => ({
      form: { ...s.form, [name]: value },
    }));
    localStorage.setItem(name, value);
  }

  render() {
    return (
      <form
        className="lg:w-1/2 mx-auto"
        onSubmit={this.handleSubmit}
      >
        <div className="flex gap-2 items-end">
          <div className="relative flex-auto text-left">
            <label
              className="leading-7 text-sm text-gray-600 mb-1 block"
              htmlFor="language"
            >
              Language
            </label>
            <input
              className="w-full bg-gray-100 bg-opacity-50 rounded border-gray-300 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-200 text-base outline-none text-gray-600 py-1 px-3 transition-colors duration-200 ease-in-out"
              type="text"
              name="language"
              value={this.state.form.language}
              onChange={this.handleChange}
            />
          </div>
          <div className="relative flex-auto text-left">
            <label
              className="leading-7 text-sm text-gray-600 mb-1 block"
              htmlFor="keyword"
            >
              Keyword
            </label>
            <input
              className="w-full bg-gray-100 bg-opacity-50 rounded border-gray-300 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-200 text-base outline-none text-gray-600 py-1 px-3 transition-colors duration-200 ease-in-out"
              type="text"
              name="keyword"
              value={this.state.form.keyword}
              onChange={this.handleChange}
            />
          </div>
          <button
            className="bg-indigo-900 text-white rounded py-1 px-3 active:scale-105"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    );
  }
}
