import Product from "../models/products.model.js";

export const getShopPage = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).render("shop", { products });
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to fetch products.");
    }
  };
  