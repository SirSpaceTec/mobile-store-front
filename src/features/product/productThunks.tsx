import type { AppDispatch } from '../../app/store';
import { loadFromCache, saveToCache } from '../../utils/cache';
import { setProducts, setLoading, setError } from './productSlice';
import type { Product } from './productTypes';

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  const cached = loadFromCache<Product[]>('products');
  if (cached) {
    dispatch(setProducts(cached));
    dispatch(setLoading(false));
    return;
  }

  try {
    const response = await fetch('/api/product');
    if (!response.ok) throw new Error('Error al cargar productos');

    const data: Product[] = await response.json();
    saveToCache('products', data);
    dispatch(setProducts(data));
  } catch (error: any) {
    dispatch(setError(error.message || 'Error desconocido'));
  } finally {
    dispatch(setLoading(false));
  }
};
