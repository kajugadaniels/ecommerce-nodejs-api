import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'abcdefgh1234567890';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        console.log(`Received JWT: ${token}`);

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('JWT verification failed:', err);
                return res.status(403).json({ message: 'Forbidden: Invalid token' });
            }

            // Attach user information to the request object
            req.user = decoded as { userId: string; email: string };
            next();
        });
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
};
