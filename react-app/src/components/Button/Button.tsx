import { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  isSubmit?: boolean;
};

const Button = ({ children, isSubmit = false }: Props) => (
  <button
    className="rounded bg-indigo-900 px-3 py-1 text-white active:scale-105"
    type={isSubmit ? 'submit' : 'button'}
  >
    {children}
  </button>
);

export default Button;
