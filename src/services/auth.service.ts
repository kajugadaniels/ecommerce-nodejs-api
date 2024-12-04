import { Request } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import bcrypt from 'bcryptjs';

export const registerUser = async (req: Request) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const userRepository = getRepository(User);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword
    });
    await userRepository.save(newUser);
    return newUser;
};

export const loginUser = async (req: Request) => {
    const { login, password } = req.body;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: [{ email: login }, { phoneNumber: login }]
    });
    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Error('Invalid credentials');
    }
    return user;
};
