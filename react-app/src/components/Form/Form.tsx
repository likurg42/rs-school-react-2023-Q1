import { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  handleSubmit: (e?: React.BaseSyntheticEvent<object> | undefined) => Promise<void>;
};

const Form = ({ handleSubmit, children }: Props) => (
  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    {children}
  </form>
);

export default Form;
