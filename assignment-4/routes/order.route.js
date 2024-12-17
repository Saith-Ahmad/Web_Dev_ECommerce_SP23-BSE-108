import express from "express";
import { createOrder, getAllOrders, getOrderById, updateOrderStatus } from "../controllers/order.controller.js";
const orderRouter = express.Router();

orderRouter.route("/create")
  .post(createOrder);

orderRouter.route("/")
  .get(getAllOrders);

orderRouter.route("/:id")
  .get(getOrderById);

orderRouter.route("/:id/status")
  .put(updateOrderStatus);

export default orderRouter;
