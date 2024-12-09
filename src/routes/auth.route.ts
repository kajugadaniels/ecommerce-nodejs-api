import express from 'express';
import { register, login, logout } from '../controllers/auth.controller';
import { loginValidation, registerValidation } from '../validations/auth.validation';
import { authenticateJWT } from '../middleware/auth.middleware';

export const auth_route = express.Router();

auth_route.post('/register', registerValidation, register);
auth_route.post('/login', loginValidation, login);
auth_route.post('/logout', authenticateJWT, logout); // Protected logout route
