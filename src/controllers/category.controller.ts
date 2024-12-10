import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../services/category.service';

export const createCategoryController = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        const category = await createCategory(req.body);
        res.status(201).json(category);
    } catch (e: any) {
        console.error('Create Category Error:', e.message);
        res.status(400).json({ message: e.message });
    }
};

export const getAllCategoriesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await getAllCategories();
        res.json(categories);
    } catch (e: any) {
        console.error('Get All Categories Error:', e.message);
        res.status(500).json({ message: e.message });
    }
};

export const getCategoryByIdController = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        const category = await getCategoryById(req.params.id);
        res.json(category);
    } catch (e: any) {
        console.error('Get Category By ID Error:', e.message);
        res.status(404).json({ message: e.message });
    }
};

export const updateCategoryController = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        const category = await updateCategory(req.params.id, req.body);
        res.json(category);
    } catch (e: any) {
        console.error('Update Category Error:', e.message);
        res.status(400).json({ message: e.message });
    }
};

export const deleteCategoryController = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        await deleteCategory(req.params.id);
        res.json({ message: 'Category deleted successfully' });
    } catch (e: any) {
        console.error('Delete Category Error:', e.message);
        res.status(404).json({ message: e.message });
    }
};
