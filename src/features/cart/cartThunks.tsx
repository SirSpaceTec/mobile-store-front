import { addToCart, removeFromCart } from '../../api/cart';
import { setCartCount, setCartItems } from './cartSlice';
import type { CartItem } from './cartTypes';
import type { AppDispatch } from '../../app/store';
import { clearCart as clearCartAPI } from '../../api/cart';

export const fetchCart = () => async (dispatch: AppDispatch) => {
  const response = await fetch('/api/cart');
  const data: CartItem[] = await response.json();

  dispatch(setCartItems(data));
  dispatch(setCartCount(data.length));
};

export const addItemAsync = (payload: { id: string; colorCode: number; storageCode: number }) =>
  async (dispatch: AppDispatch) => {
    await addToCart(payload);
    dispatch(fetchCart());
  };


export const clearCartAsync = () => async (dispatch: AppDispatch) => {
  await clearCartAPI();
  dispatch(fetchCart());
};



export const removeItemAsync = (payload: {
  id: string;
  colorCode: number;
  storageCode: number;
}) => async (dispatch: AppDispatch) => {
  await removeFromCart(payload);
  dispatch(fetchCart()); // 🔁 Actualiza Redux con el carrito actualizado
};

