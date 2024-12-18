import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

// Show signup page (GET request)
userRouter.get('/signup', (req, res) => {
  res.render('auth/signup', { error: null });  // Pass 'error' as null or an empty string
});

// Show login page (GET request)
userRouter.get('/login', (req, res) => {
  res.render('auth/login', { error: null });  // Pass 'error' as null or an empty string
});

// Signup
userRouter.post('/signup', registerUser);

// Login
userRouter.post('/login', loginUser);

// Logout
userRouter.post('/logout', logoutUser);

export default userRouter;
