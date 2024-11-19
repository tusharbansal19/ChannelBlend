const express = require('express');
const { getAllProducts, getProductById } = require('../controllers/productController');
const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.get('/', (req, res)=>{
    return res.json({message:"hello "})
});


module.exports = router;
