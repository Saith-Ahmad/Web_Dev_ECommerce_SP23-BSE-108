import express from "express"
import { createProduct, deleteProduct, getAllProducts, getAllProductsWithOptions, getSingleProduct, updateProduct } from "../controllers/product.controller.mjs";
const productRouter = express.Router();

//RestFull Crud Operations
productRouter.route('/')
  .get(getAllProductsWithOptions)        
  .post(createProduct);   

  productRouter.route('/:id')
  .get(getSingleProduct)
  .put(updateProduct)      
  .delete(deleteProduct);  

export default productRouter;


