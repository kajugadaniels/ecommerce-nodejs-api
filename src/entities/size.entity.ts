import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Size {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true, length: 100 })
    name!: string;

    @CreateDateColumn()
    createdOn!: Date;

    @UpdateDateColumn()
    updatedOn!: Date;
}
