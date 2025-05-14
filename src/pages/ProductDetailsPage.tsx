import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemAsync } from '../features/cart/cartThunks';
import type { AppDispatch } from '../app/store';
import type { Product } from '../features/product/productTypes';
import ProductImage from '../components/ProductImage';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [colorCode, setColorCode] = useState(1);
  const [storageCode, setStorageCode] = useState(1);

  const isDetail = location.pathname.startsWith('/product/');


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error('Producto no encontrado');
        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addItemAsync({ id: product.id, colorCode, storageCode }));
  };

  if (loading) return <p className="text-center mt-8">Cargando...</p>;
  if (!product) return <p className="text-center mt-8 text-red-500">No se encontró el producto</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {isDetail && (
        <nav className="text-sm text-gray-500 mb-3">
          <Link to="/" className="hover:underline">Inicio</Link> / <span>Detalles del producto</span>
        </nav>
      )}
      <Link to="/" className="text-blue-600 hover:underline text-sm">&larr; Volver</Link>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        <div className="flex justify-center items-center">
          <ProductImage productId={product.id} />
        </div> 


        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.marca} {product.modelo}</h2>
          <p className="text-xl text-blue-600 font-semibold mb-4">{product.precio.toFixed(2)} €</p>

          <ul className="text-gray-700 space-y-1 mb-6">
            <li><strong>CPU:</strong> {product.cpu}</li>
            <li><strong>RAM:</strong> {product.ram} GB</li>
            <li><strong>Sistema Operativo:</strong> {product.sistemaOperativo}</li>
            <li><strong>Pantalla:</strong> {product.resolucionPantalla}</li>
            <li><strong>Batería:</strong> {product.bateria} mAh</li>
            <li><strong>Cámaras:</strong> {product.camaras}</li>
            <li><strong>Dimensiones:</strong> {product.dimensiones}</li>
            <li><strong>Peso:</strong> {product.peso} g</li>
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 mb-1">Color</span>
              <select
                value={colorCode}
                onChange={e => setColorCode(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-2"
              >
                <option value={1}>Negro</option>
              </select>
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 mb-1">Almacenamiento</span>
              <select
                value={storageCode}
                onChange={e => setStorageCode(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-2"
              >
                <option value={1}>128 GB</option>
              </select>
            </label>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
