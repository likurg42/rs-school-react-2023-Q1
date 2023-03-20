import { useLocation } from 'react-router';
import React from 'react';

export interface WithLocationProps {
  pathname: string;
}

export function withLocation<T extends WithLocationProps = WithLocationProps>(WrappedComponent: React.ComponentType<T>) {

  function componentWithLocation(props: Omit<T, keyof WithLocationProps>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();

    const locationProps: WithLocationProps = {
      pathname,
    };

    console.log('new pathname', pathname);

    return <WrappedComponent {...locationProps} {...(props as T)}/>;
  }


  return componentWithLocation;
}
