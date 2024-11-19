// src/components/ProductCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id,product, onViewDetails }) => {
  const navigator=useNavigate();
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-green-600">{product.name}</h2>
        <p className="text-sm text-gray-600">Brand: {product.brand}</p>
        <p className="text-green-800 font-bold">Rs.{8*product.price}</p>
        <button
          onClick={() => {
            navigator("/product/"+product._id)
            console.log(product._id);

          }}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded focus:outline-none"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
