import { body, param } from 'express-validator';

export const createCategoryValidation = [
    body('name')
        .notEmpty().withMessage('Category name is required')
        .isLength({ max: 100 }).withMessage('Category name must not exceed 100 characters'),
];

export const updateCategoryValidation = [
    param('id')
        .isUUID().withMessage('Invalid category ID'),
    body('name')
        .optional()
        .notEmpty().withMessage('Category name cannot be empty')
        .isLength({ max: 100 }).withMessage('Category name must not exceed 100 characters'),
];

export const deleteCategoryValidation = [
    param('id')
        .isUUID().withMessage('Invalid category ID'),
];
