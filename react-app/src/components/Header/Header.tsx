import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { getHeader } from '../../utils/getHeader';

export const Header = () => {
  const { pathname } = useLocation();

  const navLinkClass = ({ isActive }: { isActive: boolean }) => clsx(
    isActive
    && 'underline decoration-2 underline-offset-4',
  );

  return (
    <header className="container p-4 mx-auto mb-12 flex w-full items-center">
      <h1 className="text-2xl">{getHeader(pathname)}</h1>
      <nav className="ml-auto flex justify-end gap-2">
        <NavLink
          className={navLinkClass}
          to="/"
        >
          Top G
        </NavLink>
        <NavLink
          className={navLinkClass}
          to="/profiles"
        >
          Profiles
        </NavLink>
        <NavLink
          className={navLinkClass}
          to="/about"
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};
