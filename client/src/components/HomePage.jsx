import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import BarcodeScanner from "../components/BarcodeScanner";
const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const [scannedCode, setScannedCode] = useState("");
  

  const navigate = useNavigate();

  const handleBarcodeDetected = (code) => {
    setScannedCode(code);
    const product = products.find((p) => p.barcode === code);

    if (product) {
      navigate(`/product/${product.id}`);
    } else {
      alert("No product found with this barcode.");
    }

    setShowScanner(false); // Close scanner after detection
  };
  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and search logic
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesBrand = brandFilter
        ? product.brand.toLowerCase() === brandFilter.toLowerCase()
        : true;
      return matchesSearch && matchesBrand;
    });

    setFilteredProducts(filtered);

    if (searchQuery) {
      const recommendations = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !filtered.includes(product)
      );
      setRecommendedProducts(recommendations.slice(0, 3));
    } else {
      setRecommendedProducts([]);
    }
  }, [products, searchQuery, brandFilter]);

  const handleViewDetails = (product) => {

    navigate(`/product/${product.id}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrandFilter(e.target.value);
  };

  const handleScanResult = (result) => {
    const product = products.find((item) => item.id === parseInt(result));
    if (product) {
      navigate(`/product/${product.id}`);
    } else {
      alert("Product not found!");
    }
  };

  const uniqueBrands = [...new Set(products.map((product) => product.brand))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-green-100 to-green-300">
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-green-100 to-green-300 p-8">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-green-800">Sneakers Collection</h1>
       
      </header>

      {/* {showScanner && <QRCodeScanner onScanResult={handleScanResult} />} */}

      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for sneakers..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 p-2 rounded-lg border-2 border-green-500 focus:outline-none focus:border-green-700"
        />

        {/* Filter by Brand */}
<div className="">
        <select
          value={brandFilter}
          onChange={handleBrandChange}
          className="mt-4 md:mt-0 md:ml-4 p-2 rounded-lg border-2 border-green-500 focus:outline-none mr-4 focus:border-green-700"
          
        >

          <option value="">All Brands</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
            
          ))}
        </select>
        <button
          onClick={() => setShowScanner(!showScanner)}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
        >
          {showScanner ? "Close Scanner" : "Scan Barcode"}
        </button>
      
       {showScanner&&
        <div className=" fixed z-50  left-0 top-0 border-4 border-green-500 max-w-[400px] max-h-[500px]  ">

        {showScanner && <BarcodeScanner onDetected={handleBarcodeDetected}  className="  z-50 "/>}
          </div>
        }
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Recommended for you
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      )}
         {scannedCode && (
        <p className="text-center mt-4 text-green-700">
          Scanned Barcode: {scannedCode}
        </p>
      )}
    </div>
  );
};

export default Homepage;
