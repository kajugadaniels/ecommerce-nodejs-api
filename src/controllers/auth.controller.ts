import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { validationResult } from 'express-validator';

export const register = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const user = await registerUser(req);
        res.status(201).json(user);
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const { user, token } = await loginUser(req);
        console.log(`Generated JWT: ${token}`); // For debugging
        res.json({ message: 'Login successful', user, token });
    } catch (e: any) {
        res.status(401).json({ message: e.message });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    // Since JWT is stateless, simply respond with success.
    // The client should delete the token.
    res.json({ message: 'Logout successful' });
};
