import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from './cartTypes';

const CART_KEY = 'cartData';

interface CartState {
  items: CartItem[];
  count: number;
}

const loadCartFromLocalStorage = (): CartState => {
  try {
    const data = localStorage.getItem(CART_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return { items: [], count: 0 };
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
      state.count += 1;
    },
    setCartCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
     setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.count = action.payload.length;
    },
    clearCart(state) {
      state.items = [];
      state.count = 0;
    },
  },

});

export const { addItemToCart, setCartCount, setCartItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
