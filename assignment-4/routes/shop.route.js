import express from "express"
import { getShopPage } from "../controllers/shop.controller.js";
const shopRouter = express.Router();

shopRouter.route('/shop')
  .get(getShopPage);



export default shopRouter;
