import React from 'react';

export default class AboutPage extends React.Component {
  render() {
    return (
      <div className="lg:container px-5 mx-auto text-gray-900">
        <p className="mb-2">I create this app to learn how github api works, and being able to
          easily search for
          best repos. I hope
          you enjoy it!
        </p>
        <p>
          by
          {' '}
          <a href="https://github.com/likurg42"
             className="inline-flex bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-2 text-white rounded">@likurg42</a>
        </p>
      </div>
    );
  }
}
