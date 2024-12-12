import express from 'express';
import { createProductController, getAllProductsController, getProductByIdController, updateProductController, deleteProductController } from '../controllers/product.controller';
import { createProductValidation, updateProductValidation, deleteProductValidation } from '../validations/product.validation';
import { authenticateJWT } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/admin.middleware';

export const product_route = express.Router();

product_route.post('/product/add', authenticateJWT, isAdmin, createProductValidation, createProductController);
product_route.get('/products', authenticateJWT, isAdmin, getAllProductsController);
product_route.get('/product/:id', authenticateJWT, isAdmin, getProductByIdController);
product_route.put('/product/:id/edit', authenticateJWT, isAdmin, updateProductValidation, updateProductController);
product_route.delete('/product/:id/delete', authenticateJWT, isAdmin, deleteProductValidation, deleteProductController);
