import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { AccountType } from '../entities/user.entity';

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.accountType === AccountType.ADMIN) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Admins only' });
    }
};
