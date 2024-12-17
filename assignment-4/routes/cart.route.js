import express from "express";
import { addToCart, viewCart, removeFromCart, checkoutCart } from "../controllers/cart.controller.js";


const cartRouter = express.Router();
cartRouter.get("/", viewCart); 
cartRouter.post("/add/:productId", addToCart);
cartRouter.post("/remove/:productId", removeFromCart); 
cartRouter.post("/checkout", checkoutCart); 

export default cartRouter;
