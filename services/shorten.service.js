import { config } from '../config/config.js';
import { nanoid } from 'nanoid';

export class ShortenService {
    async create(url) {
        const urlCode = nanoid(8);
        const shortUrl = `${config.url}/${urlCode}`;

        return {
            id: 1,
            url: url,
            shortCode: urlCode,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
