import express from "express";
import { all_users, create_user } from "../controllers/user.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
export const user_route = express.Router();

user_route.get("/allusers", authenticateJWT, all_users);
user_route.post("/add-new-user", create_user);
