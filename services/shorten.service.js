import { nanoid } from 'nanoid';
import { sequelize } from '../libs/sequelize.js';
import Boom from '@hapi/boom';

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

        return shortUrl;
    }

    async findOne(shortCode) {
        const url = await this.findByShortCode(shortCode);

        delete url.dataValues.statistics;

        return url;
    }

    async update(shortCode, newUrl) {
        const url = await this.findByShortCode(shortCode);

        const updatedUrl = await url.update({
            originalUrl: newUrl,
        });

        delete updatedUrl.dataValues.statistics;

        return updatedUrl;
    }

    async delete(shortCode) {
        const url = await this.findByShortCode(shortCode);

        const deletedUrl = await url.update({
            isActive: false,
        });

        delete deletedUrl.dataValues.statistics;

        return deletedUrl;
    }

    async redirect(shortCode) {
        const url = await this.findByShortCode(shortCode);

        await url.increment('statistics');

        return url.originalUrl;
    }

    // Internal class helpers methods
    async findByShortCode(shortCode) {
        const url = await this.models.Url.findOne({
            where: {
                shortCode,
                isActive: true,
            },
            attributes: { exclude: ['isActive'] },
        });

        if (!url) {
            throw Boom.notFound('The URL with this short code does not exist');
        }

        return url;
    }
}
