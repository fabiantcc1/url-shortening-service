import { config } from '../config/config';
import { Pool } from 'pg';

const USER = encodeURIComponent(config.db.user);
const PASSWORD = encodeURIComponent(config.db.password);
const HOST = config.db.host;
const PORT = config.db.port;
const DATABASE = config.db.database;
const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;

export const pool = new Pool({
    connectionString: URI,
});
