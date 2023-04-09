import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

type Props = {
  label: string;
  name: string;
  type?: 'text' | 'number';
};

const Input = forwardRef(({
  name, label, type = 'text', ...props
}: Props, ref: ForwardedRef<HTMLInputElement>) => (
  <label htmlFor={name} className="text-left">
    <span className="block text-sm leading-7 text-gray-600">
      {label}
    </span>
    <input
      ref={ref}
      type={type}
      name={name}
      id={name}
      className={clsx(
        'w-full  px-3 py-1 ',
        'text-base bg-gray-100 bg-opacity-50 text-gray-600 rounded border-gray-300 outline-none transition-colors duration-200 ease-in-out',
        'focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-200'
      )}
      {...props}
    />
  </label>
));

export default Input;
