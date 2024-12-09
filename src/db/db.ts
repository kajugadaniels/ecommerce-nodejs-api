import { createConnection } from 'typeorm';
import { User } from '../entities/user.entity';
import dotenv from 'dotenv';

dotenv.config();

export const db = createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User],
    synchronize: true,
    logging: false,
})
.then(() => console.log("Database connected successfully"))
.catch(err => console.error("Database connection failed", err));
