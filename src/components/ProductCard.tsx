import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../features/product/productTypes';
import ProductImage from './ProductImage';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-4">
      <Link to={`/product/${product.id}`} className="flex flex-col items-center text-center">
        <ProductImage productId={product.id} />

        <h3 className="text-lg font-semibold text-gray-800">
          {product.modelo}
        </h3>
        <p className="text-blue-600 font-bold mt-1">
          {product.precio.toFixed(2)} €
        </p>
      </Link>
    </div>
  );
};

export default ProductCard;
