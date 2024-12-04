import express from "express";
import { all_users, create_user } from "../controllers/user.controller";
export const user_route = express.Router();

user_route.get("/allusers", all_users);
user_route.post("/add-new-user", create_user);
