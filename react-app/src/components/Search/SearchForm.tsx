import React, { ChangeEvent, PropsWithChildren } from 'react';

interface Props {
  setCurrentLanguage: (language: string) => void;
  currentLanguage: string;
}

interface State {
  form: {
    language: string,
  };
}

export default class SearchForm extends React.Component<PropsWithChildren<Props>, State> {
  constructor(props: Props) {
    super(props);
    const language = localStorage.getItem('language') || props.currentLanguage;
    this.state = {
      form: {
        language,
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.props.setCurrentLanguage(this.state.form.language)
  }

  handleChange(e:ChangeEvent<HTMLInputElement>){
    const {name, value} = e.target;
    console.log(name, value);
    this.setState((s) => ({
      form: {...s.form, [name]: value},
    }))
    localStorage.setItem('language', value);
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
            className="leading-7 text-sm text-gray-600"
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
