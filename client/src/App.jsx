import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import ProductDetailsModal from "./components/ProductDetailsModal.jsx";
import ProductPage from "./components/ProductPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Use the element prop and pass the component as a JSX element */}
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductPage />} />

      </Routes>
    </Router>
  );
}

export default App;

