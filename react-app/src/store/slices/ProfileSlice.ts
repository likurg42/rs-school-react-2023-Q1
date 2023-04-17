import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { ProfileModel } from '../../types/profile.model';

type ProfileState = {
  list: ProfileModel[],
};

const initialState: ProfileState = {
  list: [],
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<ProfileModel>) => {
      state.list.push(action.payload);
    }
  }
});

export const { actions: profileActions } = profileSlice;
