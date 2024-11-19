const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
// const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const Product = require('./model/Product.js');

dotenv.config();




const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
     
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};





connectDB();

const sampleProducts = [
  {
    name: "Air Max 270",
    brand: "Nike",
    price: 150,
    image: "https://i8.amplience.net/i/jpl/jd_009318_a?qlt=92",
    description: "The Nike Air Max 270 features a large Air unit in the heel for maximum cushioning and a sleek design.",
    barcode: "0123456789012",
    reviews: ["Very comfortable!", "Stylish and durable.", "Worth the price."]
  },
  {
    name: "Yeezy Boost 350 V2",
    brand: "Adidas",
    price: 220,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQlPnna_esmQwicuQltd1h1WnVw6au62kyd2dPjTvk3Lj_HVeuajuyyO_VmftQ43xIuEjsx6ziEK4LuIpM1YxFYOXyb8Vdt",
    description: "The Yeezy Boost 350 V2 offers unparalleled comfort with a minimalist style that's iconic in street fashion.",
    barcode: "0987654321098",
    reviews: ["Super comfortable!", "Best sneakers I've ever owned.", "Great for daily wear."]
  },
  {
    name: "Classic Leather",
    brand: "Reebok",
    price: 75,
    image: "https://cdn.shopify.com/s/files/1/0276/6320/4405/files/Reebok_Classic_Leather_Sneakers_480x480.png?v=1628745848",
    description: "A timeless classic, the Reebok Classic Leather features a soft leather upper and a durable rubber outsole.",
    barcode: "1234567890123",
    reviews: ["Classic and versatile.", "Good value for money.", "Perfect for casual wear."]
  },
  {
    name: "Old Skool",
    brand: "Vans",
    price: 60,
    image: "https://th.bing.com/th/id/OIP.aPTCWVczZKgw_SsBfSfO-gHaHa?w=205&h=205&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    description: "The Vans Old Skool is an iconic skate shoe with a durable canvas upper and signature side stripe.",
    barcode: "3210987654321",
    reviews: ["Great for skateboarding.", "Love the retro look.", "Comfortable and stylish."]
  },
  {
    name: "Ultraboost 22",
    brand: "Adidas",
    price: 180,
    image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/310929/01/sv03/fnd/IND/fmt/png/SOFTRIDE-Enzo-Evo-Camo-Unisex-Running-Shoes",
    description: "The Adidas Ultraboost 22 provides responsive cushioning and a snug, sock-like fit for maximum performance.",
    barcode: "5678901234567",
    reviews: ["Perfect for running.", "Amazing comfort.", "High quality and durable."]
  },
  {
    name: "Gel-Kayano 28",
    brand: "ASICS",
    price: 140,
    image: "https://images.asics.com/is/image/asics/1011B189_003_SR_RT_GLB?$zoom$",
    description: "The ASICS Gel-Kayano 28 offers superior stability and cushioning for long-distance runners.",
    barcode: "7654321098765",
    reviews: ["Excellent stability.", "Comfortable for marathons.", "Great arch support."]
  },
  {
    name: "Air Force 1",
    brand: "Nike",
    price: 100,
    image: "https://www.bing.com/th?id=OPAC.gjMYn76QBjEbsQ474C474&o=5&pid=21.1&w=148&h=148&rs=1&qlt=100&dpr=1.4&bw=6&bc=FFFFFF",
    description: "The Nike Air Force 1 is a classic basketball shoe with a durable leather upper and a timeless design.",
    barcode: "2345678901234",
    reviews: ["Timeless design.", "Durable and stylish.", "Great everyday shoe."]
  },
  {
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 55,
    image: "https://images.dsw.com/is/image/DSWShoes/425199_001_ss_03?$pdp-image$",
    description: "The Converse Chuck Taylor All Star is an iconic canvas sneaker with a vulcanized rubber sole.",
    barcode: "9876543210123",
    reviews: ["Classic style.", "Affordable and durable.", "Great for casual wear."]
  },
  {
    name: "ZoomX Vaporfly Next%",
    brand: "Nike",
    price: 250,
    image: "https://cdna.lystit.com/1200/630/tr/photos/mrporter/c4503bd1/nike-Orange-Zoomx-Vaporfly-Next-2-Mesh-Running-Sneakers.jpeg",
    description: "The Nike ZoomX Vaporfly Next% is a high-performance racing shoe with advanced energy return.",
    barcode: "3456789012345",
    reviews: ["Lightweight and fast.", "Best for marathons.", "Unmatched performance."]
  },
  {
    name: "Gel-Nimbus 24",
    brand: "ASICS",
    price: 150,
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/s/c/v/-original-imahfxt6jwyqzyeu.jpeg?q=20&crop=false",
    description: "The ASICS Gel-Nimbus 24 offers plush cushioning and a smooth ride for neutral runners.",
    barcode: "6543210987654",
    reviews: ["Very comfortable.", "Great for long runs.", "High-quality materials."]
  }
];




const app = express();
app.use(cors());
app.use(express.json());

const addProducts = async () => {
  try {
    const result = await Product.insertMany(sampleProducts);
    console.log("Products added successfully:", result);
  } catch (error) {
    console.error("Error adding products:", error.message);
  }
};

// addProducts();
const clearProducts = async () => {
  try {
    const result = await Product.deleteMany({});
    console.log(`All products deleted successfully. Deleted count: ${result.deletedCount}`);
  } catch (error) {
    console.error("Error deleting products:", error.message);
  }
};
// clearProducts();



app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
