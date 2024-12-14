import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AccountType } from '../entities/user.entity';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'abcdefgh1234567890';

// Define the shape of the decoded JWT payload
export interface DecodedToken {
    userId: string;
    email: string;
    accountType: AccountType;
}

// Extend the Request interface to include the user property
export interface AuthRequest extends Request {
    user?: DecodedToken;
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
            req.user = decoded as DecodedToken;
            next();
        });
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
};
