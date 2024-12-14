export interface CreateProductImageRequest {
    productId: string;
    image: string;
}

export interface UpdateProductImageRequest {
    image?: string;
}
