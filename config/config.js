import dotenv from 'dotenv';

dotenv.config();

export const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.NODE_PORT || 3000,
    url: process.env.NODE_URL || `http://localhost:${port}`,
};
