import express from 'express';
import { ShortenService } from '../services/shorten.service.js';
import { validateHandler } from '../middleware/validator.handler.js';
import { createShortUrlSchema } from '../schemas/url.scheme.js';

const router = express.Router();
const service = new ShortenService();

router.post(
    '/',
    validateHandler(createShortUrlSchema, 'body'),
    async (req, res, next) => {
        try {
            const { url } = req.body;
            const shortUrl = await service.create(url);

            res.status(201).json(shortUrl);
        } catch (err) {
            next(err);
        }
    },
);

export default router;
