import { Component, PropsWithChildren } from 'react';

export default class Header extends Component<PropsWithChildren> {
  constructor(props: PropsWithChildren) {
    super(props);
  }

  render() {
    return (
      <header className="mb-12 flex w-full flex-col text-center">
        <h1 className="mb-4 text-2xl font-medium title-font sm:text-3xl">
          Top G&apos;s
        </h1>
        <p className="leading-relaxed mb-4">Best developers on github</p>
        {this.props.children}
      </header>
    )
  }
}
