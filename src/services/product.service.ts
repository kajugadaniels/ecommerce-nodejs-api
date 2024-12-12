import { getRepository } from 'typeorm';
import { CreateProductRequest, UpdateProductRequest } from '../types/product.type';
import { Product } from '../entities/product.entity';
import { Size } from '../entities/size.entity';
import { Category } from '../entities/category.entity';
import { ProductImages } from '../entities/productImages.entity';

export const createProduct = async (data: CreateProductRequest): Promise<Product> => {
    const productRepository = getRepository(Product);
    const sizeRepository = getRepository(Size);
    const categoryRepository = getRepository(Category);
    const productImagesRepository = getRepository(ProductImages);

    // Check if product with the same title already exists
    const existingProduct = await productRepository.findOneBy({ title: data.title });
    if (existingProduct) {
        throw new Error('Product with this title already exists');
    }

    // Fetch category
    const category = await categoryRepository.findOneBy({ id: data.categoryId });
    if (!category) {
        throw new Error('Category not found');
    }

    // Fetch sizes
    const sizes = await sizeRepository.findByIds(data.sizeIds);
    if (sizes.length !== data.sizeIds.length) {
        throw new Error('One or more Sizes not found');
    }

    // Create product
    const product = productRepository.create({
        title: data.title,
        price: data.price,
        category: category,
        sizes: sizes,
        image: data.image,
        color: data.color,
        gender: data.gender,
        description: data.description,
    });

    // Handle additional product images
    if (data.productImages && data.productImages.length > 0) {
        const productImages = data.productImages.map((img) => {
            return productImagesRepository.create({
                image: img,
                product: product,
            });
        });
        product.productImages = productImages;
    }

    await productRepository.save(product);
    return product;
};

export const getAllProducts = async (): Promise<Product[]> => {
    const productRepository = getRepository(Product);
    const products = await productRepository.find({
        relations: ['category', 'sizes', 'productImages'],
    });
    return products;
};

export const getProductById = async (id: string): Promise<Product> => {
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne({
        where: { id },
        relations: ['category', 'sizes', 'productImages'],
    });
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
};

export const updateProduct = async (id: string, data: UpdateProductRequest): Promise<Product> => {
    const productRepository = getRepository(Product);
    const sizeRepository = getRepository(Size);
    const categoryRepository = getRepository(Category);
    const productImagesRepository = getRepository(ProductImages);

    const product = await productRepository.findOne({
        where: { id },
        relations: ['sizes', 'productImages'],
    });
    if (!product) {
        throw new Error('Product not found');
    }

    if (data.title) {
        // Check if another product with the same title exists
        const existingProduct = await productRepository.findOneBy({ title: data.title });
        if (existingProduct && existingProduct.id !== id) {
            throw new Error('Another product with this title already exists');
        }
        product.title = data.title;
    }

    if (data.price) {
        product.price = data.price;
    }

    if (data.categoryId) {
        const category = await categoryRepository.findOneBy({ id: data.categoryId });
        if (!category) {
            throw new Error('Category not found');
        }
        product.category = category;
    }

    if (data.sizeIds) {
        const sizes = await sizeRepository.findByIds(data.sizeIds);
        if (sizes.length !== data.sizeIds.length) {
            throw new Error('One or more Sizes not found');
        }
        product.sizes = sizes;
    }

    if (data.image) {
        product.image = data.image;
    }

    if (data.color) {
        product.color = data.color;
    }

    if (data.gender) {
        product.gender = data.gender;
    }

    if (data.description) {
        product.description = data.description;
    }

    if (data.productImages) {
        // Remove existing product images
        await productImagesRepository.delete({ product: { id: product.id } });
        // Add new product images
        const productImages = data.productImages.map((img) => {
            return productImagesRepository.create({
                image: img,
                product: product,
            });
        });
        product.productImages = productImages;
    }

    await productRepository.save(product);
    return product;
};

export const deleteProduct = async (id: string): Promise<void> => {
    const productRepository = getRepository(Product);
    const product = await productRepository.findOneBy({ id });
    if (!product) {
        throw new Error('Product not found');
    }
    await productRepository.remove(product);
};
