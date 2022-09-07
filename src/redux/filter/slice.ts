import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FilterSliceState,
  sortBy,
  SortItem,
  sortName,
  sortOrder,
} from './types';

export const initialSort = {
  name: sortName.RATING,
  sortBy: sortBy.RATING,
  order: sortOrder.DESC,
};

const initialState: FilterSliceState = {
  categoryId: 0,
  searchValue: '',
  currentPage: 1,
  sort: initialSort,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSort: (state, action: PayloadAction<SortItem>) => {
      state.sort = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.sort = action.payload.sort;
      state.categoryId = action.payload.categoryId;
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const {
  setCategoryId,
  setSearchValue,
  setCurrentPage,
  setSort,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
