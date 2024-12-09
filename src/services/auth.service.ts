import { Request } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

export const registerUser = async (req: Request): Promise<User> => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({ where: [{ email }, { phoneNumber }] });
    if (existingUser) {
        throw new Error('User with given email or phone number already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
    });
    await userRepository.save(newUser);
    return newUser;
};

export const loginUser = async (req: Request): Promise<{ user: User; token: string }> => {
    const { login, password } = req.body;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: [{ email: login }, { phoneNumber: login }]
    });
    if (!user || !await bcrypt.compare(password, user.password)) {
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
