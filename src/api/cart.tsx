export interface AddToCartRequest {
  id: string;
  colorCode: number;
  storageCode: number;
}

export interface AddToCartResponse {
  count: number;
}

export const addToCart = async (payload: AddToCartRequest): Promise<AddToCartResponse> => {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Error al añadir al carrito');
  return res.json();
};

export const clearCart = async (): Promise<void> => {
  await fetch('/api/cart/all', { method: 'DELETE' });
};

export const removeFromCart = async (payload: {
  id: string;
  colorCode: number;
  storageCode: number;
}): Promise<{ count: number }> => {
  const response = await fetch('/api/cart', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Error al eliminar del carrito');
  }

  return await response.json();
};
