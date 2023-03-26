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
      <header className="container mx-auto mb-12 flex w-full items-center">
        <h1 className="text-2xl">{getHeader(pathname)}</h1>
        <nav className="m-4 ml-auto flex justify-end gap-2">
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
