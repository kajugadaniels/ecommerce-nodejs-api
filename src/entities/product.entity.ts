import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Size } from './size.entity';
import { ProductImages } from './productImages.entity';

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    BOTH = 'Both',
}

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ length: 200 })
    title!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @ManyToOne(() => Category, { eager: true })
    category!: Category;

    @ManyToMany(() => Size, { eager: true })
    @JoinTable({
        name: 'product_sizes',
        joinColumn: { name: 'product_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'size_id', referencedColumnName: 'id' },
    })
    sizes!: Size[];

    @Column({ length: 255 })
    image!: string;

    @Column({ length: 50 })
    color!: string;

    @Column({
        type: 'enum',
        enum: Gender,
        default: Gender.BOTH,
    })
    gender!: Gender;

    @Column('text')
    description!: string;

    @OneToMany(() => ProductImages, (productImage) => productImage.product, { cascade: true, eager: true })
    productImages!: ProductImages[];

    @CreateDateColumn()
    createdOn!: Date;

    @UpdateDateColumn()
    updatedOn!: Date;
}