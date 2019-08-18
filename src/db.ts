import { createConnection } from 'typeorm';
import { entities } from './entities';

// load config properties
require('custom-env').env(process.env.NODE_ENV || 'development');

// should consider missing of these properties as an exception
const {
    DB_NAME = 'default',
    DB_USER = 'root',
    DB_PASSWORD,
    DB_HOST = 'localhost',
    DB_PORT = 5432,
    NODE_ENV
} = process.env;

export const getConnection = () =>
    createConnection({
        type: 'postgres',
        host: DB_HOST,
        port: Number(DB_PORT),
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        entities: entities,
        synchronize: true,
        logging: NODE_ENV != 'production'
    });
