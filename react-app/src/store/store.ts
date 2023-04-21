import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit/';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { repoApi } from './services/repoApi';
import { profileSlice } from './slices/ProfileSlice';
import { repositoriesSlice } from './slices';

export const rootReducer = combineReducers({
  [repoApi.reducerPath]: repoApi.reducer,
  profile: profileSlice.reducer,
  repositories: repositoriesSlice.reducer,
});

export const rootServicesMiddleware = [repoApi.middleware];

export const setupStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootServicesMiddleware),
});

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
