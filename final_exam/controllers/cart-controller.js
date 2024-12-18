import { Cart } from "../models/Cart.js";


export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('items.productId');
    res.render('cart', { cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};


export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne() || new Cart({ items: [] });

    const existingItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne();

    cart.items = cart.items.filter(
      (item) => !item.productId.equals(productId)
    );

    await cart.save();
    res.status(200).json({ message: 'Product removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove product from cart' });
  }
};
