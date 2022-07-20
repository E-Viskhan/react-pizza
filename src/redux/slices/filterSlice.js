import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  searchValue: '',
  currentPage: 1,
  countItems: 0,
  sort: {
    name: 'популярные',
    sortProperty: 'rating',
    order: 'desc',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCountItems: (state, action) => {
      state.countItems = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setFilters: (state, action) => {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId) || 0;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const {
  setCategoryId,
  setSearchValue,
  setCurrentPage,
  setCountItems,
  setSort,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
