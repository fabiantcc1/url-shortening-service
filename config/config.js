import dotenv from 'dotenv';

dotenv.config();

export const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.NODE_PORT || 3000,
    url: process.env.NODE_URL || `http://localhost:${port}`,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        uri: process.env.DB_URI,
    },
};
