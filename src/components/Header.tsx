import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { clearCartAsync, removeItemAsync } from '../features/cart/cartThunks';
import { useDispatch } from 'react-redux';

const Header: React.FC = () => {
  const count = useSelector((state: RootState) => state.cart.count);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [showCart, setShowCart] = useState(false);

  const location = useLocation();
  const isDetail = location.pathname.startsWith('/product/');

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Link to="/" className="text-2xl font-bold ">
            <span className='text-gray-600'><span className='text-3xl'>M</span>obile</span><span className='text-violet-600'><span className='text-3xl'>S</span>tore</span>
          </Link>
          {isDetail && (
            <nav className="text-sm text-gray-500 ml-10">
              <Link to="/" className="hover:underline">Inicio</Link> <span className="mx-1">{'>'}</span> <span>Detalles del producto</span>
            </nav>
          )}

        </div>
        <button
          className="cursor-pointer text-lg font-medium text-gray-700 hover:text-blue-700"
          onClick={() => setShowCart(true)}
        >
          🛒 <span className="font-bold text-blue-700">{count}</span>
        </button>
      </header>

      {showCart && (
        <div className="fixed inset-0 bg-gray-400 z-20" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} onClick={() => setShowCart(false)}>
          <div
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-4 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Tu carrito</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-red-600 text-lg cursor-pointer">
                ❌
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-gray-400">Tu carrito está vacío</p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item, index) => (
                  <li key={index} className="border-b pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">{item.marca} {item.modelo}</p>
                        <p className="text-sm text-gray-600">Precio: {item.precio.toFixed(2)} €</p>
                        <p className="text-sm text-gray-500">
                          Color: {item.colorCode}, Almacenamiento: {item.storageCode}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          dispatch(
                            removeItemAsync({
                              id: item.id,
                              colorCode: item.colorCode,
                              storageCode: item.storageCode,
                            })
                          )
                        }
                        className="text-red-500 text-sm hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {cartItems.length > 0 && (
              <button
                onClick={() => dispatch(clearCartAsync())}
                className="mt-4 bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 text-sm"
              >
                Vaciar carrito
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
