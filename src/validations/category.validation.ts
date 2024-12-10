import { body } from 'express-validator';

export const createCategoryValidation = [
    body('name')
        .notEmpty().withMessage('Category name is required')
        .isLength({ max: 100 }).withMessage('Category name must not exceed 100 characters')
];

export const updateCategoryValidation = [
    body('name')
        .optional()
        .notEmpty().withMessage('Category name cannot be empty')
        .isLength({ max: 100 }).withMessage('Category name must not exceed 100 characters')
];
