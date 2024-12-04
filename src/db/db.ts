import { createConnection } from 'typeorm';
import { User } from '../entities/user.entity';

export const db = createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'enso',
    entities: [User],
    synchronize: true,
    // logging: true,
})
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection failed", err));
