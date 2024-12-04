import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';

export const s_create_user = async(req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const {firstName, lastName, email, phoneNumber} = req.body;
    const newUser = userRepository.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber
    });

    await userRepository.save(newUser);
    return newUser;
}
