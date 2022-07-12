import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  countItems: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCountItems: (state, action) => {
      state.countItems = action.payload;
    },
  },
});

export const { changePage, setCountItems } = paginationSlice.actions;

export default paginationSlice.reducer;
