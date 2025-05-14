import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/cart/cartSlice';

const CART_KEY = 'cartData';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});

// 🔁 Guardar automáticamente el estado del carrito
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
