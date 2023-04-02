import React from 'react';

export const AboutPage = () => (
  <div className="mx-auto px-5 text-gray-900 lg:container">
    <p className="mb-2">
      I create this app to learn how github api works, and being able to
      easily search for
      best repos. I hope
      you enjoy it!
    </p>
    <p>
      by
      {' '}
      <a
        href="https://github.com/likurg42"
        className="inline-flex rounded bg-violet-500 p-2 text-white hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700"
      >
        @likurg42
      </a>
    </p>
  </div>
);
