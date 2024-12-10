import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.accountType === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Admins only' });
    }
};
