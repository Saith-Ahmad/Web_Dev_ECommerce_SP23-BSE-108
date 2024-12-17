import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, unique:true},
    description: { type: String},
    price: { type: Number, required: true},
    brand: { type : String, required : true},
    productImage: { type: String, required: true},
});


const Product = mongoose.model("Product", productSchema);
export default Product;