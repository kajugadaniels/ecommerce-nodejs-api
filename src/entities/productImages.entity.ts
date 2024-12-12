import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImages {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Product, (product) => product.productImages, { onDelete: 'CASCADE' })
    product!: Product;

    @Column({ length: 255 })
    image!: string;

    @CreateDateColumn()
    createdOn!: Date;

    @UpdateDateColumn()
    updatedOn!: Date;
}
