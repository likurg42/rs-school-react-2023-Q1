import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { repositoriesActions } from '../store/slices';

export const useRepositories = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector((state: RootState) => state.repositories.currentFilter);
  const inputFilter = useAppSelector((state: RootState) => state.repositories.inputFilter);
  const actions = useMemo(() => bindActionCreators(
    { ...repositoriesActions },
    dispatch
  ), [dispatch]);

  return {
    currentFilter,
    inputFilter,
    ...actions
  };
};
