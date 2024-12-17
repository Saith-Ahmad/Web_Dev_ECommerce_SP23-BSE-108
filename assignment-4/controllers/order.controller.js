import Order from "../models/order.model.js";

// Create a new order
export const createOrder = async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => { 
  try {
    const orders = await Order.find().populate("userId").populate("items.productId");
    res.status(200).render("order/order", { orders });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch orders");
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate("userId").populate("items.productId");
    if (!order) {
      return res.status(404).send("Order not found");
    }
    res.status(200).render("admin/orderDetails", { order });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch order");
  }
};

// Update the order status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).send("Order not found");
    }
    res.status(200).json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to update order status");
  }
};
