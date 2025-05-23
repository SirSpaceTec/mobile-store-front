import React, { useState } from 'react';

interface Props {
  productId: string;
  sizeClass?: string;
}

const ProductImage: React.FC<Props> = ({ productId, sizeClass = "w-32 h-32" }) => {
  const [src, setSrc] = useState(`http://localhost:8080/phones/${productId}.jpg`);

  const handleError = () => {
    if (src.endsWith('.jpg')) {
      setSrc(`http://localhost:8080/phones/${productId}.png`);
    } else {
      setSrc('/fallback.jpg');
    }
  };

  return (
    <img
      src={src}
      alt={`Imagen producto ${productId}`}
      className={`${sizeClass} object-contain`}
      onError={handleError}
    />
  );
};

export default ProductImage;
