import { createConnection } from 'typeorm';

export const db = createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'enso',
    entities: [],
    synchronize: true
})