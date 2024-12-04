import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';
import { validationResult } from 'express-validator';

export const register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await registerUser(req);
        res.status(201).json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await loginUser(req);
        res.json({ message: 'Login successful', user });
    } catch (e) {
        res.status(401).json({ message: e.message });
    }
};
