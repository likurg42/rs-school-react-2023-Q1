/* eslint-disable @typescript-eslint/no-throw-literal */
import { useEffect, useMemo, useState } from 'react';
import client, { CustomConfig } from '../common/client';

export function suspensify<T>(promise: Promise<T>) {
  let status = 'pending';

  let result: T;
  const suspender = promise.then(
    (res: T) => {
      status = 'success';
      result = res;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      }

      // success
      return result;
    },
  };
}

const useData = <T,>(endpoint: string, config?: Partial<CustomConfig>) => {
  const [state, setState] = useState<{ read(): T; } | null>(null);
  const emptyConfig = useMemo(() => ({}), []);
  const currentConfig = config || emptyConfig;

  useEffect(() => {
    setState(suspensify(client<T>(endpoint, currentConfig)));
  }, [endpoint, config, currentConfig]);

  return state;
};

export default useData;
