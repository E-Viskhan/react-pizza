import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  searchValue: '',
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
    setSort: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { setCategoryId, setSearchValue, setSort } = filterSlice.actions;

export default filterSlice.reducer;
