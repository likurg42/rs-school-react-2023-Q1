import { useCallback, useState } from 'react';

type ModalState<T> = {
  isOpen: boolean,
  data: T | null,
};

export const useModal = <T,>() => {
  const [modalState, setModalState] = useState<ModalState<T>>({
    data: null,
    isOpen: false,
  });
  const toggle = useCallback((isOpen: boolean, data: T | null = null) => setModalState(() => {
    const newState = {
      isOpen,
      data,
    };

    return newState;
  }), [setModalState]);
  return {
    modalState,
    toggle,
  };
};
