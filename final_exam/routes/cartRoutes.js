import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
} from '../controllers/cart-controller.js';

const cartRoutes = express.Router();

cartRoutes.get('/', getCart);
cartRoutes.post('/add', addToCart);

//Rendering add to cart form
cartRoutes.get('/add', (req, res) => {
  res.render('addToCart');
});


//Rendering Component to Remove From cart
cartRoutes.get('/remove', (req, res) => {
  res.render('removeFromCart');
});

cartRoutes.post('/remove', removeFromCart);

export default cartRoutes;
