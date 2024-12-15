import express from "express";
import cors from "cors";
import connectDB from "./config/dbConfig.mjs";
import productRouter from "./routes/product.route.mjs";


const server = express();
server.use(cors());
server.use(express.json());

server.use('/api/admin/products', productRouter);



connectDB().then(() => {
    server.listen(5000, ()=>{
        console.log('Server Running on Specified Port...')
    });
});