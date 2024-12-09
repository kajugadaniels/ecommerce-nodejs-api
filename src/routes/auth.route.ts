import express from 'express';
import { login, register, logout } from '../controllers/auth.controller';
import { loginValidation, registerValidation } from '../validations/auth.validation';

export const auth_route = express.Router();

auth_route.post('/register', registerValidation, register);
auth_route.post('/login', loginValidation, login);
auth_route.post('/logout', logout);
