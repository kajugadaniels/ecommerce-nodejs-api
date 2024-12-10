import { getRepository } from 'typeorm';
import { CreateCategoryRequest, UpdateCategoryRequest } from '../types/category.type';
import { Category } from '../entities/category.entity';

export const createCategory = async (data: CreateCategoryRequest): Promise<Category> => {
    const categoryRepository = getRepository(Category);

    // Check if category with the same name already exists
    const existingCategory = await categoryRepository.findOne({ where: { name: data.name } });
    if (existingCategory) {
        throw new Error('Category with this name already exists');
    }

    const category = categoryRepository.create(data);
    await categoryRepository.save(category);
    return category;
};

export const getAllCategories = async (): Promise<Category[]> => {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find();
    return categories;
};

export const getCategoryById = async (id: string): Promise<Category> => {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.findOne(id);
    if (!category) {
        throw new Error('Category not found');
    }
    return category;
};

export const updateCategory = async (id: string, data: UpdateCategoryRequest): Promise<Category> => {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.findOne(id);
    if (!category) {
        throw new Error('Category not found');
    }

    if (data.name) {
        // Check if another category with the same name exists
        const existingCategory = await categoryRepository.findOne({ where: { name: data.name } });
        if (existingCategory && existingCategory.id !== id) {
            throw new Error('Another category with this name already exists');
        }
        category.name = data.name;
    }

    await categoryRepository.save(category);
    return category;
};

export const deleteCategory = async (id: string): Promise<void> => {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.findOne(id);
    if (!category) {
        throw new Error('Category not found');
    }
    await categoryRepository.remove(category);
};
