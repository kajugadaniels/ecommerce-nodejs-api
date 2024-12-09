import { Request } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { LoginRequest, RegisterRequest } from '../types/auth.type';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'abcdefgh1234567890';
const JWT_EXPIRATION = process.env.JWT_EXPIRES_IN || '1h';

export const registerUser = async (req: Request): Promise<User> => {
    const { firstName, lastName, email, phoneNumber, password } = req.body as RegisterRequest;
    const userRepository = getRepository(User);

    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: [{ email }, { phoneNumber }] });
    if (existingUser) {
        throw new Error('User with given email or phone number already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = userRepository.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
        dob: '1990-01-01',
    });

    // Save the user to the database
    await userRepository.save(newUser);
    return newUser;
};

export const loginUser = async (req: Request): Promise<{ user: User; token: string }> => {
    const { login, password } = req.body as LoginRequest;
    const userRepository = getRepository(User);

    // Find user by email or phone number
    const user = await userRepository.findOne({
        where: [{ email: login }, { phoneNumber: login }]
    });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Generate JWT
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
    );

    // Optionally update lastLogin
    user.lastLogin = new Date();
    await userRepository.save(user);

    return { user, token };
};
