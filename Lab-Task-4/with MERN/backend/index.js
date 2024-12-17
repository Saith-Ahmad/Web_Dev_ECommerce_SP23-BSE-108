import express from "express";
import cors from "cors";
import connectDB from "./config/dbConfig.js";
import productRouter from "./routes/product.route.js";


const server = express();
server.use(cors());
server.use(express.json());

server.use('/api/admin/products', productRouter);


//Lab-Task-4 requirments, sorting, pagination, searching applied in the product.controllers.js file.
connectDB().then(() => {
    server.listen(5000, ()=>{
        console.log('Server Running on Specified Port...')
    });
});