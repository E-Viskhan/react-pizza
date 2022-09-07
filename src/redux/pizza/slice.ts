import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pizzasApi } from '../../api';
import {
  FetchPizzasAnswer,
  FetchPizzasArgs,
  Pizza,
  PizzaSliceState,
  Status,
} from './types';

const initialState: PizzaSliceState = {
  items: [],
  countItems: 0,
  status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<FetchPizzasAnswer, FetchPizzasArgs>(
  'pizza/fetchPizzas',
  async (params) => {
    const { categoryId, sortBy, order, searchValue, limit, currentPage } =
      params;

    const { data } = await pizzasApi.getPizzas({
      categoryId,
      sortBy,
      order,
      searchValue,
      limit,
      currentPage,
    });

    return data;
  }
);

const pizzaSlice = createSlice({
  initialState,
  name: 'pizza',
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.countItems = 0;
      state.items = [];
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
      state.countItems = 0;
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload.pizzas;
      state.countItems = action.payload.count;
      state.status = Status.SUCCESS;
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
