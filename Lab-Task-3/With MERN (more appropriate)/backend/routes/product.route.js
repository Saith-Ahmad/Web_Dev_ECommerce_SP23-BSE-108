import express from "express"
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/product.controller.js";
const productRouter = express.Router();

//RestFull Crud Operations
productRouter.route('/')
  .get(getAllProducts)        
  .post(createProduct);   

  productRouter.route('/:id')
  .get(getSingleProduct)
  .put(updateProduct)      
  .delete(deleteProduct);  

export default productRouter;


