import { Component, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component<PropsWithChildren> {
  constructor(props: PropsWithChildren) {
    super(props);
  }

  render() {
    return (
      <header className="mb-12 flex w-full flex-col text-center">
        <nav className="flex justify-end gap-2 m-4">
          <NavLink
            className={({ isActive }) => isActive ? 'underline decoration-2 underline-offset-4' : ''}
            to="/">
            Main
          </NavLink>
          <NavLink
            className={({ isActive }) => isActive ? 'underline decoration-2 underline-offset-4' : ''}
            to="/about">
            About
          </NavLink>
        </nav>
      </header>
    );
  }
}
