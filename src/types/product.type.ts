import { Gender } from '../entities/product.entity';

export interface CreateProductRequest {
    title: string;
    price: number;
    categoryId: string;
    sizeIds: string[];
    image: string;
    color: string;
    gender: Gender;
    description: string;
    productImages?: string[];
}

export interface UpdateProductRequest {
    title?: string;
    price?: number;
    categoryId?: string;
    sizeIds?: string[];
    image?: string;
    color?: string;
    gender?: Gender;
    description?: string;
    productImages?: string[];
}
