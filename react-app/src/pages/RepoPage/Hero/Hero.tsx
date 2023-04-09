import { PropsWithChildren } from 'react';

export const Hero = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <section className="mx-auto mb-12 flex flex-col text-center lg:w-1/2">
      <h1 className="mb-4 text-2xl font-medium title-font sm:text-3xl">
        Top G&apos;s
      </h1>
      <p className="mb-4 leading-relaxed">Find awesome repositories on github</p>
      {children}
    </section>
  );
};
