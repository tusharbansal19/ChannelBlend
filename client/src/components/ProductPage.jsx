import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/${id}`); // Replace with your backend URL
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product details. Please try again.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    alert(`Thank you for buying ${product?.name}!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-white to-green-200">
        <div className="spinner"></div>
        <h2 className="text-xl text-green-700 mt-4"><Loader/></h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-red-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-white to-green-200">
      <div className="flex flex-col md:flex-row max-w-[85%] w-full bg-white shadow-2xl rounded-lg overflow-hidden transform transition duration-500 min-h-[80vh]">
        {/* Left Side: Product Image */}
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[80vh] object-fill"
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between bg-white bg-opacity-90 backdrop-blur-lg">
          <div>
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              {product.name}
            </h1>
            <h2 className="text-2xl text-gray-600 mb-6 text-orange-600">Brand: {product.brand}</h2>
            <p className="text-lg text-gray-700 mb-8">{product.description}</p>
            <p className="text-3xl font-semibold text-green-700 mb-6">
              Rs.{8*product.price}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center">
            <button
              onClick={handleBuyNow}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full mr-4 transition-transform transform hover:scale-110"
            >
              Buy Now
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-full transition-transform transform hover:scale-110"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
