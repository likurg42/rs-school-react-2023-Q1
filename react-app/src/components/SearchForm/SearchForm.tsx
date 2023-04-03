import React, { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  setCurrentLanguage: (params: { language: string, keyword: string }) => void;
  currentLanguage: string;
  currentKeyword: string;
}

interface FormValues {
  language: string,
  keyword: string,
}

export const SearchForm = ({ currentLanguage, currentKeyword, setCurrentLanguage }: Props) => {
  const {
    register,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      language: localStorage.getItem('language') || currentLanguage,
      keyword: localStorage.getItem('keyword') || currentKeyword,
    },
  });

  const onSubmit = (data: FormValues) => {
    const { language, keyword } = data;
    setCurrentLanguage({ language, keyword });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    localStorage.setItem(name, value);
  };

  const language = register('language', {
    onChange: handleChange,
  });
  const keyword = register('keyword', {
    onChange: handleChange,
  });

  return (
    <form
      className="mx-auto lg:w-1/2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-end gap-2">
        <div className="relative flex-auto mb-1  text-left">
          <label
            className="block text-sm leading-7 text-gray-600"
            htmlFor="language"
          >
            Language
            <input
              className="w-full rounded border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base text-gray-600 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-200"
              type="text"
              id="language"
              name={language.name}
              onChange={language.onChange}
              onBlur={language.onBlur}
              ref={language.ref}
            />
          </label>
        </div>
        <div className="relative flex-auto text-left">
          <label
            className="block text-sm leading-7 text-gray-600"
            htmlFor="keyword"
          >
            Keyword
            <input
              className="w-full rounded border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base text-gray-600 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-200"
              type="text"
              id="keyword"
              name={keyword.name}
              onChange={keyword.onChange}
              onBlur={keyword.onBlur}
              ref={keyword.ref}
            />
          </label>
        </div>
        <button
          className="rounded bg-indigo-900 px-3 py-1 text-white active:scale-105"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
};
