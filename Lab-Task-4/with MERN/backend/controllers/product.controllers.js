import Product from "../models/products.model.js";


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



//Function Covering Lab_Task_4 Reuirments
//This Function will fetch product and apply searching, sorting, and pagination.
//The Filteration will be done on Frontend
export const getAllProductsWithOptions = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sortBy = 'price', sortOrder = 'asc' } = req.query;
    const pageNum = parseInt(page);
    const pageLimit = parseInt(limit);

      //serach
      const searchQuery = search
      ? {
        $or : [
          { title : {   $regex : search, $options : 'i' }},
          { description : {   $regex : search, $options : 'i' }},
          { brand : {   $regex : search, $options : 'i' }},
        ]
      }
      : {};

    //sorting
    const sortOrderValue = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const products = await Product.find(searchQuery)
      .skip((pageNum - 1) * pageLimit) 
      .limit(pageLimit) 
      .sort({ [sortBy]: sortOrderValue });

    const totalProducts = await Product.countDocuments(searchQuery);

    res.status(200).json({
      products,
      totalPages: Math.ceil(totalProducts / pageLimit),
      currentPage: pageNum, 
      totalProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
