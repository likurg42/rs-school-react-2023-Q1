import { Component, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component<PropsWithChildren> {
  constructor(props: PropsWithChildren) {
    super(props);
  }

  render() {
    return (
      <header className="mb-12 flex w-full flex-col text-center">
        <nav className="flex justify-end gap-2 m-4">
          <Link to="/">Main</Link>
          <Link to="/about">About</Link>
        </nav>

      </header>
    );
  }
}
