import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { validationResult } from 'express-validator';

export const register = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Send detailed validation errors
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const user = await registerUser(req);
        res.status(201).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            accountType: user.accountType,
            verified: user.verified,
            dob: user.dob,
            createdOn: user.createdOn,
            // Exclude sensitive fields like password
        });
    } catch (e: any) {
        console.error('Registration Error:', e.message); // Detailed backend error logging
        res.status(500).json({ message: e.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Send detailed validation errors
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const { user, token } = await loginUser(req);
        res.json({ message: 'Login successful', user, token });
    } catch (e: any) {
        console.error('Login Error:', e.message); // Detailed backend error logging
        res.status(401).json({ message: e.message });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    // Since JWTs are stateless, the server doesn't need to do anything.
    // The client should delete the token on logout.
    res.json({ message: 'Logout successful. Please delete your token on the client side.' });
};
