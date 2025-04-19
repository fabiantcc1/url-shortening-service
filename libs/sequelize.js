import { Sequelize } from 'sequelize';
import { setupModels } from '../db/models/index.js';
import { config } from '../config/config.js';

let uri = '';

const options = {
    dialect: 'postgres',
    logging: config.env === 'development' ? console.log : false,
};

if (config.env === 'production') {
    options.dialectOptions = {
        ssl: {
            rejectUnauthorized: false,
        },
    };
    uri = config.db.uri;
} else {
    const USER = encodeURIComponent(config.db.user);
    const PASSWORD = encodeURIComponent(config.db.password);
    const DB_DATABASE = encodeURIComponent(config.db.database);
    const DB_HOST = encodeURIComponent(config.db.host);
    const DB_PORT = encodeURIComponent(config.db.port);

    uri = `postgres://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
    options.dialectOptions = {
        ssl: false,
    };
}

export const sequelize = new Sequelize(uri, options);

setupModels(sequelize);
