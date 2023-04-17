import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { RepoFilter } from '../../types/filter-repo';

type FilterReposState = {
  currentFilter: RepoFilter,
  inputFilter: RepoFilter,
};

const initialState: FilterReposState = {
  currentFilter: {
    language: 'javascript',
    keyword: '',
  },
  inputFilter: {
    language: 'javascript',
    keyword: '',
  },
};

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    updateCurrentFilter: (state, action: PayloadAction<RepoFilter>) => {
      state.currentFilter = { ...action.payload };
    },
    updateInputFilter: (state, action: PayloadAction<RepoFilter>) => {
      state.inputFilter = { ...action.payload };
    }
  }
});

export const { actions: repositoriesActions } = repositoriesSlice;
