// src/components/ProductDetailsModal.js
import React from "react";

const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md p-6">
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-600 font-bold mb-4"
        >
          Close
        </button>
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
        <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
        <p className="text-sm text-gray-600">Brand: {product.brand}</p>
        <p className="text-gray-800">{product.description}</p>
        <p className="mt-2 text-sm text-gray-600">Reviews: {product.reviews}</p>
        <p className="mt-4 text-green-800 font-bold">{product.price}</p>
        <h1>qr here</h1>

      </div>
    </div>
  );
};

export default ProductDetailsModal;
