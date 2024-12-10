import express from 'express';
import { authenticateJWT } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/admin.middleware';
import { createSizeValidation, deleteSizeValidation, updateSizeValidation } from '../validations/size.validation';
import { createSizeController, deleteSizeController, getAllSizesController, getSizeByIdController, updateSizeController } from '../controllers/size.controller';

export const size_route = express.Router();

size_route.post('/size/add', authenticateJWT, isAdmin, createSizeValidation, createSizeController);
size_route.get('/sizes', authenticateJWT, isAdmin, getAllSizesController);
size_route.get('/size/:id', authenticateJWT, isAdmin, getSizeByIdController);
size_route.put('/size/:id/edit', authenticateJWT, isAdmin, updateSizeValidation, updateSizeController);
size_route.delete('/size/:id/delete', authenticateJWT, isAdmin, deleteSizeValidation, deleteSizeController);
