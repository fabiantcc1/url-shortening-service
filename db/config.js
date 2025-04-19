import { config } from '../config/config.js';

module.exports = {
    development: {
        username: config.db.user,
        password: config.db.password,
        database: config.db.database,
        host: config.db.host,
        port: config.db.port,
        dialect: 'postgres',
    },
    production: {
        url: config.db.uri,
        dialect: 'postgres',
    },
};
