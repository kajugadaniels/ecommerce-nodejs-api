import { body, param } from 'express-validator';

export const createProductValidation = [
    body('title')
        .notEmpty().withMessage('Product title is required')
        .isLength({ max: 200 }).withMessage('Product title must not exceed 200 characters'),
    body('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('categoryId')
        .notEmpty().withMessage('Category ID is required')
        .isUUID().withMessage('Invalid Category ID'),
    body('sizeIds')
        .isArray({ min: 1 }).withMessage('At least one Size ID is required'),
    body('sizeIds.*')
        .isUUID().withMessage('Invalid Size ID'),
    body('image')
        .notEmpty().withMessage('Product image is required')
        .isURL().withMessage('Invalid image URL'),
    body('color')
        .notEmpty().withMessage('Color is required')
        .isLength({ max: 50 }).withMessage('Color must not exceed 50 characters'),
    body('gender')
        .notEmpty().withMessage('Gender is required')
        .isIn(['Male', 'Female', 'Both']).withMessage('Gender must be Male, Female, or Both'),
    body('description')
        .notEmpty().withMessage('Description is required'),
    body('productImages')
        .optional()
        .isArray().withMessage('ProductImages must be an array'),
    body('productImages.*')
        .optional()
        .isURL().withMessage('Invalid ProductImage URL'),
];

export const updateProductValidation = [
    param('id')
        .isUUID().withMessage('Invalid product ID'),
    body('title')
        .optional()
        .notEmpty().withMessage('Product title cannot be empty')
        .isLength({ max: 200 }).withMessage('Product title must not exceed 200 characters'),
    body('price')
        .optional()
        .isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('categoryId')
        .optional()
        .isUUID().withMessage('Invalid Category ID'),
    body('sizeIds')
        .optional()
        .isArray({ min: 1 }).withMessage('At least one Size ID is required'),
    body('sizeIds.*')
        .optional()
        .isUUID().withMessage('Invalid Size ID'),
    body('image')
        .optional()
        .isURL().withMessage('Invalid image URL'),
    body('color')
        .optional()
        .isLength({ max: 50 }).withMessage('Color must not exceed 50 characters'),
    body('gender')
        .optional()
        .isIn(['Male', 'Female', 'Both']).withMessage('Gender must be Male, Female, or Both'),
    body('description')
        .optional()
        .notEmpty().withMessage('Description cannot be empty'),
    body('productImages')
        .optional()
        .isArray().withMessage('ProductImages must be an array'),
    body('productImages.*')
        .optional()
        .isURL().withMessage('Invalid ProductImage URL'),
];

export const deleteProductValidation = [
    param('id')
        .isUUID().withMessage('Invalid product ID'),
];
