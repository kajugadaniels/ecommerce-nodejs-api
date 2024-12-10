import express from 'express';
import { authenticateJWT } from '../middleware/auth.middleware';
import { createCategoryValidation, deleteCategoryValidation, updateCategoryValidation } from '../validations/category.validation';
import { createCategoryController, deleteCategoryController, getAllCategoriesController, getCategoryByIdController, updateCategoryController } from '../controllers/category.controller';
import { isAdmin } from '../middleware/admin.middleware';

export const category_route = express.Router();

// Protected routes: require authentication
category_route.post('/category/add', authenticateJWT, isAdmin, createCategoryValidation, createCategoryController);
category_route.get('/categories', authenticateJWT, isAdmin, getAllCategoriesController);
category_route.get('/category/:id', authenticateJWT, isAdmin, getCategoryByIdController);
category_route.put('/category/:id/edit', authenticateJWT, isAdmin, updateCategoryValidation, updateCategoryController);
category_route.delete('category/:id/delete', authenticateJWT, isAdmin, deleteCategoryValidation, deleteCategoryController);
