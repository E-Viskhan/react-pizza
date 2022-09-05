import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum sortName {
  RATING = 'популярные',
  EXPENSIVE_FIRST = 'сначала дорогие',
  CHEAP_FIRST = 'сначала доступные',
  ALPHABET = 'от А до Я',
  REVERSE_ALPHABET = 'от А до Я',
}

export enum sortBy {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export enum sortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortItem = {
  name: sortName;
  sortBy: sortBy;
  order: sortOrder;
};

export interface FilterSliceState {
  categoryId: number;
  searchValue?: string;
  currentPage: number;
  sort: SortItem;
}

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

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const {
  setCategoryId,
  setSearchValue,
  setCurrentPage,
  setSort,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
