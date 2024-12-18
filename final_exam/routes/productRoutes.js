import express from 'express';
import { createProduct, getAllProducts, getProductById } from "../controllers/product-controller.js";


const productRoutes = express.Router();

productRoutes.get('/', getAllProducts);
productRoutes.get('/:id', getProductById);

//rendering form to create product
productRoutes.get('/create', (req, res) => {
    res.render('createProduct');
  });
  
productRoutes.post('/', createProduct);

export default productRoutes;
