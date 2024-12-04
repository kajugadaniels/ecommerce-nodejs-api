import { body } from 'express-validator';

export const registerValidation = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('phoneNumber').isMobilePhone('any').withMessage('Must be a valid phone number'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    })
];

export const loginValidation = [
    body('login').notEmpty().withMessage('Email or Phone Number is required'),
    body('password').notEmpty().withMessage('Password is required'),
];
