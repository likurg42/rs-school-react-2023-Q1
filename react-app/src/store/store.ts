import { configureStore } from '@reduxjs/toolkit/';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { repoApi } from './repoApi';
import { profileSlice } from './ProfileSlice';

export const store = configureStore({
  reducer: {
    [repoApi.reducerPath]: repoApi.reducer,
    profile: profileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(repoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
