import Cart from "../models/cart.model.js";
import Product from "../models/products.model.js";

// Add item to cart
export const addToCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.session.userId; 

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.render("error", { message: "Product not found" });
    }

    // Check if the user already has a cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if product already exists in cart
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity
    } else {
      cart.items.push({ product: productId, quantity: 1 }); // Add new item
    }

    await cart.save();
    res.redirect("/cart"); // Redirect to cart page
  } catch (error) {
    console.error(error);
    res.render("error", { message: "Failed to add product to cart" });
  }
};




// View cart
export const viewCart = async (req, res) => {
    const userId = req.session.userId;
  
    try {
      const cart = await Cart.findOne({ user: userId }).populate("items.product");
      if (!cart || cart.items.length === 0) {
        return res.render("cart/cart", { cart: null });
      }
      res.render("cart/cart", { cart });
    } catch (error) {
      console.error(error);
      res.render("error", { message: "Failed to fetch cart" });
    }
  };

  

// Remove item from cart
export const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const userId = req.session.userId;
  
    try {
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.render("error", { message: "Cart not found" });
      }
  
      // Filter out the product to be removed
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
      await cart.save();
      res.redirect("/cart");
    } catch (error) {
      console.error(error);
      res.render("error", { message: "Failed to remove product from cart" });
    }
  };

  

// Checkout cart
export const checkoutCart = async (req, res) => {
    const userId = req.session.userId;
  
    try {
      const cart = await Cart.findOne({ user: userId });
      if (!cart || cart.items.length === 0) {
        return res.render("error", { message: "Cart is empty" });
      }
  
      cart.items = [];
      await cart.save();
  
      res.render("cart/checkout", { message: "Order placed successfully!" });
    } catch (error) {
      console.error(error);
      res.render("error", { message: "Failed to checkout" });
    }
  };
  