import User from "../models/user.model.js";
import bcrypt from "bcrypt"


export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        req.flash("error", "User not found!");
        return res.redirect("/login"); // Redirect back to login page
      }
  
      // Compare the provided password with the hashed one
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  
      if (!isPasswordCorrect) {
        req.flash("error", "Incorrect password!");
        return res.redirect("/login");
      }
  
      // Set session data
      req.session.user = {
        id: user._id,
        username: user.username,
      };
  
      req.flash("success", `Welcome back, ${user.username}!`);
      return res.redirect("/"); 
    } catch (error) {
      console.error(error);
      req.flash("error", "Something went wrong!");
      res.redirect("/");
    }
};



export const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        req.flash("error", "Email is already registered!");
        return res.redirect("/register");
      }
  
      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      req.flash("success", "Registration successful! Please log in.");
      return res.redirect("/"); 
    } catch (error) {
      console.error(error);
      req.flash("error", "Registration failed. Try again!");
      res.redirect("/");
    }
  };
  
