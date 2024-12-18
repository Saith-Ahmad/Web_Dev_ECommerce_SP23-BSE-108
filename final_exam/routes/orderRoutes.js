import express from 'express';
import {
  createOrder,
  getAllOrders,
} from '../controllers/order-controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const orderRoutes = express.Router();

orderRoutes.post('/checkout',createOrder);

//rendering form to make post request to checkout
orderRoutes.get('/checkout', (req, res) => {
  res.render('checkout');
});


orderRoutes.get('/admin',protect, getAllOrders);

export default orderRoutes;
