import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const UserRouter = express.Router();

// Render login and register pages
UserRouter.route("/login").get((req, res) => res.render("auth/login"));
UserRouter.route("/register").get((req, res) => res.render("auth/register"));

// Handle login and registration
UserRouter.route("/login").post(loginUser);
UserRouter.route("/register").post(registerUser);

export default UserRouter;
