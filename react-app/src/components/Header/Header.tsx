import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getHeader } from '../../utils/getHeader';

interface Props {
  pathname: string;
}

export default class Header extends Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { pathname } = this.props;
    return (
      <header className="mb-12 flex items-center w-full container mx-auto">
        <h1 className="text-2xl">{getHeader(pathname)}</h1>
        <nav className="flex ml-auto justify-end gap-2 m-4">
          <NavLink
            className={({ isActive }) => isActive ? 'underline decoration-2 underline-offset-4' : ''}
            to="/">
            Top G
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
