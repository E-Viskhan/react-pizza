import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  searchValue: '',
  sortType: {
    name: 'популярные',
    sortProperty: 'rating',
    order: 'desc',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.categoryId = action.payload;
    },
    changeSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { changeCategory, changeSearchValue, changeSortType } =
  filterSlice.actions;

export default filterSlice.reducer;
