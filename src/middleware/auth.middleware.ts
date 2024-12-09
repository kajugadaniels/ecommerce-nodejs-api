import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { isTokenBlacklisted } from './tokenBlacklist';

dotenv.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
    token?: string;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        if (isTokenBlacklisted(token)) {
            return res.status(403).json({ message: 'Forbidden: Token is blacklisted' });
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('JWT verification failed:', err);
                return res.status(403).json({ message: 'Forbidden: Invalid token' });
            }

            // Attach user information and token to the request object
            req.user = decoded as { userId: string; email: string };
            req.token = token;
            next();
        });
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
};
