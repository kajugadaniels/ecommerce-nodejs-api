import { getRepository } from 'typeorm';
import { CreateSizeRequest, UpdateSizeRequest } from '../types/size.type';
import { Size } from '../entities/size.entity';

export const createSize = async (data: CreateSizeRequest): Promise<Size> => {
    const sizeRepository = getRepository(Size);

    // Check if size with the same name already exists
    const existingSize = await sizeRepository.findOneBy({ name: data.name });
    if (existingSize) {
        throw new Error('Size with this name already exists');
    }

    const size = sizeRepository.create(data);
    await sizeRepository.save(size);
    return size;
};

export const getAllSizes = async (): Promise<Size[]> => {
    const sizeRepository = getRepository(Size);
    const sizes = await sizeRepository.find();
    return sizes;
};

export const getSizeById = async (id: string): Promise<Size> => {
    const sizeRepository = getRepository(Size);
    const size = await sizeRepository.findOneBy({ id });
    if (!size) {
        throw new Error('Size not found');
    }
    return size;
};

export const updateSize = async (id: string, data: UpdateSizeRequest): Promise<Size> => {
    const sizeRepository = getRepository(Size);
    const size = await sizeRepository.findOneBy({ id });
    if (!size) {
        throw new Error('Size not found');
    }

    if (data.name) {
        // Check if another size with the same name exists
        const existingSize = await sizeRepository.findOneBy({ name: data.name });
        if (existingSize && existingSize.id !== id) {
            throw new Error('Another size with this name already exists');
        }
        size.name = data.name;
    }

    await sizeRepository.save(size);
    return size;
};

export const deleteSize = async (id: string): Promise<void> => {
    const sizeRepository = getRepository(Size);
    const size = await sizeRepository.findOneBy({ id });
    if (!size) {
        throw new Error('Size not found');
    }
    await sizeRepository.remove(size);
};
