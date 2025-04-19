import { config } from '../config/config.js';
import { nanoid } from 'nanoid';
import { sequelize } from '../libs/sequelize.js';

export class ShortenService {
    constructor() {
        this.models = sequelize.models;
    }

    async create(url) {
        const urlCode = nanoid(8);
        const urlData = {
            originalUrl: url,
            shortCode: urlCode,
        };

        const shortUrl = await this.models.Url.create(urlData);
        delete shortUrl.dataValues.statistics;
        delete shortUrl.dataValues.isActive;
        shortUrl.dataValues.fullShortUrl = `${config.url}/${urlCode}`;

        return shortUrl;
    }
}
