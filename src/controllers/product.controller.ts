import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../services/product.service';

export const createProductController = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (e: any) {
        console.error('Create Product Error:', e.message);
        res.status(400).json({ message: e.message });
    }
};

export const getAllProductsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (e: any) {
        console.error('Get All Products Error:', e.message);
        res.status(500).json({ message: e.message });
    }
};

export const getProductByIdController = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        const product = await getProductById(req.params.id);
        res.json(product);
    } catch (e: any) {
        console.error('Get Product By ID Error:', e.message);
        res.status(404).json({ message: e.message });
    }
};

export const updateProductController = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        const product = await updateProduct(req.params.id, req.body);
        res.json(product);
    } catch (e: any) {
        console.error('Update Product Error:', e.message);
        res.status(400).json({ message: e.message });
    }
};

export const deleteProductController = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        await deleteProduct(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (e: any) {
        console.error('Delete Product Error:', e.message);
        res.status(404).json({ message: e.message });
    }
};