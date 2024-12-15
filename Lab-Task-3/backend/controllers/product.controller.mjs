import Product from "../models/products.model.mjs";


// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); 
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};



// Create New Product
export const createProduct = async (req, res) => {
  const { title, description, price, brand, productImage } = req.body;
  try {
    const newProduct = new Product({
      title,
      description,
      price,
      brand,
      productImage,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    if (error.code === 11000) { // Handling duplicate title errors
      res.status(400).json({ error: "Product title must be unique" });
    } else {
      res.status(500).json({ error: "Failed to create product" });
    }
  }
};

// Update Product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, brand, productImage } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, price, brand, productImage },
      { new: true, runValidators: true } // Returns the updated document
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete Product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
