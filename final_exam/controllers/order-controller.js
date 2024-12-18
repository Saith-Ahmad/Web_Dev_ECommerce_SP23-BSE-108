import { Cart } from "../models/Cart.js";
import { Order } from "../models/Order.js";


export const createOrder = async (req, res) => {
  try {
    const { customerName, street, city, postalCode } = req.body;

    // Validation: Check if all required fields are provided
    if (!customerName || !street || !city || !postalCode) {
      return res.render('checkout', { error: 'All fields are required' });
    }

    // Fetch the cart from the database
    const cart = await Cart.findOne();
    if (!cart || cart.items.length === 0) {
      return res.render('checkout', { error: 'Cart is empty' });
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.productId.price,
      0
    );

    // Create the order
    const order = new Order({
      customerName,
      address: { street, city, postalCode },
      items: cart.items,
      totalAmount,
    });

    await order.save();

    // Clear the cart after the order is placed
    await Cart.deleteOne();

    // Redirect to home page
    res.redirect('/');
  } catch (err) {
    res.status(500).render('checkout', { error: 'Failed to create order' });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.render('admin/orders', { orders });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
