import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pizzasApi } from '../../api';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async (params) => {
    const { categoryId, sortBy, order, searchValue, limit, currentPage } =
      params;

    const data = await pizzasApi.getPizzas(
      categoryId,
      sortBy,
      order,
      searchValue,
      limit,
      currentPage
    );
    return data;
  }
);

const initialState = {
  items: [],
  countItems: 0,
  status: 'loading',
};

const pizzaSlice = createSlice({
  initialState,
  name: 'pizza',
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload.pizzas;
      state.countItems = action.payload.count;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
      state.countItems = 0;
    },
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
