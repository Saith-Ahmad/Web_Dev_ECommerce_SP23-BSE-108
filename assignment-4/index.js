import express from "express";
import cors from "cors";
import connectDB from "./config/dbConfig.js";
import productRouter from "./routes/product.route.js";
import session from "express-session";
import flash from "connect-flash";
import UserRouter from "./routes/user.route.js";
import cartRouter from "./routes/cart.route.js";
import shopRouter from "./routes/shop.route.js";
import orderRouter from "./routes/order.route.js";

const server = express();
server.set("view engine", "ejs");

//Middlwwares
server.use(cors());
server.use(express.json());     
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public")); 
// server.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// server.use(flash());
// server.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   next();
// });


//Route paths
server.use('/api/admin/products', productRouter);
server.use('/api/auth', UserRouter);
server.use('/cart', cartRouter);
server.use('/', shopRouter);
server.use('/orders', orderRouter);

//Home Page Rendering
server.use('/', (req, res)=>{res.render('home')})



connectDB().then(() => {
    server.listen(5000, ()=>{
        console.log('Server Running on Specified Port...')
    });
});