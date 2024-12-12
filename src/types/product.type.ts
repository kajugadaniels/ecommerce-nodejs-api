export interface CreateProductRequest {
    title: string;
    price: number;
    categoryId: string;
    sizeIds: string[];
    image: string;
    color: string;
    gender: 'Male' | 'Female' | 'Both';
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
    gender?: 'Male' | 'Female' | 'Both';
    description?: string;
    productImages?: string[];
}
