import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { profileActions } from '../store/ProfileSlice';

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const profileList = useAppSelector((state: RootState) => state.profile.list);
  const actions = useMemo(() => bindActionCreators(
    { ...profileActions },
    dispatch
  ), [dispatch]);

  return {
    profileList,
    ...actions
  };
};
