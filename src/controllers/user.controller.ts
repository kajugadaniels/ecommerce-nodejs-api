import { Request, Response } from "express";
import { s_create_user } from "../services/user.service";

export const all_users = async (req: Request, res: Response) => {
    res.send("Hello");
};

export const create_user = async (req: Request, res: Response) => {
    const result = await s_create_user(req, res)

    res.json(result)
};
