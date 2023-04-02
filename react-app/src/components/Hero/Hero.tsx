import React, { PropsWithChildren } from 'react';

export default class Hero extends React.Component<PropsWithChildren> {
  render() {
    const { children } = this.props;
    return (
      <section className="mb-12 flex w-full flex-col text-center">
        <h1 className="mb-4 text-2xl font-medium title-font sm:text-3xl">
          Top G&apos;s
        </h1>
        <p className="mb-4 leading-relaxed">Find awesome repositories on github</p>
        {children}
      </section>
    );
  }
}
