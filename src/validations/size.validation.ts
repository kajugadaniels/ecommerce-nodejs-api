import { body, param } from 'express-validator';

export const createSizeValidation = [
    body('name')
        .notEmpty().withMessage('Size name is required')
        .isLength({ max: 100 }).withMessage('Size name must not exceed 100 characters'),
];

export const updateSizeValidation = [
    param('id')
        .isUUID().withMessage('Invalid size ID'),
    body('name')
        .optional()
        .notEmpty().withMessage('Size name cannot be empty')
        .isLength({ max: 100 }).withMessage('Size name must not exceed 100 characters'),
];

export const deleteSizeValidation = [
    param('id')
        .isUUID().withMessage('Invalid size ID'),
];
