import dotenv from 'dotenv';

dotenv.config();

export const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    url: process.env.APP_URL || `http://localhost:${port}`,
};
