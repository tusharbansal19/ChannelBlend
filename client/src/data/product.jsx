// src/data/products.js
const products = [
    {
      id: 1,
      name: "Nike Air Max",
      brand: "Nike",
      price: "$150",
      image: "https://via.placeholder.com/150?text=Nike+Air+Max",
      description: "Classic Nike Air Max sneakers with superior cushioning.",
      reviews: "Comfortable and stylish with great support."
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      brand: "Adidas",
      price: "$180",
      image: "https://via.placeholder.com/150?text=Adidas+Ultraboost",
      description: "Responsive and comfortable running shoes.",
      reviews: "Perfect for long-distance running and casual wear."
    },
    {
      id: 3,
      name: "Puma RS-X",
      brand: "Puma",
      price: "$120",
      image: "https://via.placeholder.com/150?text=Puma+RS-X",
      description: "Futuristic sneakers with bold design elements.",
      reviews: "Unique style with great comfort."
    },
    ...Array.from({ length: 97 }, (_, index) => ({
      id: index + 4,
      name: `Sneaker Model ${index + 4}`,
      brand: ["Nike", "Adidas", "Puma", "Reebok", "New Balance", "Asics", "Vans", "Converse", "Fila", "Under Armour"][
        Math.floor(Math.random() * 10)
      ],
      price: `$${Math.floor(Math.random() * 101) + 50}`, // Random price between $50 and $150
      image: `https://via.placeholder.com/150?text=Sneaker+${index + 4}`,
      description: `Experience unparalleled comfort and style with Sneaker Model ${index + 4}. Designed for performance and fashion.`,
      reviews: [
        "Super comfortable for all-day wear.",
        "Great support, perfect for running.",
        "Stylish and trendy, fits true to size.",
        "Amazing quality for the price!",
        "Excellent cushioning and durability."
      ][Math.floor(Math.random() * 5)]
    }))
  ];
  
  export default products;
  