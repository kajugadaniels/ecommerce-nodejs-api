import { Request, Response } from "express";

export const all_users = async (req: Request, res: Response) => {
    res.send("Hello");
};
