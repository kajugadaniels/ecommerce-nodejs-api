import express from 'express';
import { authenticateJWT } from '../middleware/auth.middleware';
import { createCategoryValidation, deleteCategoryValidation, updateCategoryValidation } from '../validations/category.validation';
import { createCategoryController, deleteCategoryController, getAllCategoriesController, getCategoryByIdController, updateCategoryController } from '../controllers/category.controller';

export const category_route = express.Router();

// Protected routes: require authentication
category_route.post('/', authenticateJWT, createCategoryValidation, createCategoryController);
category_route.get('/', authenticateJWT, getAllCategoriesController);
category_route.get('/:id', authenticateJWT, getCategoryByIdController);
category_route.put('/:id', authenticateJWT, updateCategoryValidation, updateCategoryController);
category_route.delete('/:id', authenticateJWT, deleteCategoryValidation, deleteCategoryController);
