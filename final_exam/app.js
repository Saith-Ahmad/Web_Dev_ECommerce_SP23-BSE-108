import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cartRoutes from './routes/cartRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(express.static('public'))

// Connect to MongoDB
mongoose 
  .connect("mongodb://localhost:27017")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

//Protected Route For All Orders (Only Admin Can View)
app.use('/orders' , orderRoutes);
app.use('/auth', userRouter);


//Front Page
app.use('/', (req, res)=>{
  res.render('index')
})

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
