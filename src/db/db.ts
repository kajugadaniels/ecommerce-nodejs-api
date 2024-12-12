import { createConnection } from 'typeorm';
import { User } from '../entities/user.entity';
import dotenv from 'dotenv';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import { Size } from '../entities/size.entity';

dotenv.config();

export const db = createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Category, Size, Product],
    synchronize: true,
    logging: false,
})
.then(() => console.log("Database connected successfully"))
.catch(err => console.error("Database connection failed", err));
