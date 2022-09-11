import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartSliceState } from './types';
import { calcPriceFromSize } from '../../utils';

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        const price = calcPriceFromSize(
          action.payload.price,
          action.payload.size
        );

        state.items.push({ ...action.payload, price });
      }
      state.totalPrice = state.items.reduce((acc, item) => {
        return acc + item.price * item.count;
      }, 0);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        state.totalPrice -= item.price * item.count;
      }

      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item && item.count > 1) {
        item.count--;
        state.totalPrice -= item.price;
      }
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    setCart: (state, action: PayloadAction<CartSliceState>) => {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});
export const { addItem, removeItem, minusItem, clearItems, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
