import express from "express";
import { login, register } from "../controllers/auth.controller";
export const user_route = express.Router();

user_route.post("/login", login);
user_route.post("/register", register);
