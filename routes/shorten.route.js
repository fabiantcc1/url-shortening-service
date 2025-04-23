import express from 'express';
import { ShortenService } from '../services/shorten.service.js';
import { validateHandler } from '../middleware/validator.handler.js';
import {
    createShortUrlSchema,
    getShortUrlSchema,
    updateShortUrlSchema,
} from '../schemas/url.scheme.js';

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

router.get(
    '/:shortCode',
    validateHandler(getShortUrlSchema, 'params'),
    async (req, res, next) => {
        try {
            const { shortCode } = req.params;
            const url = await service.FindOne(shortCode);

            res.status(200).json(url);
        } catch (err) {
            next(err);
        }
    },
);

router.patch(
    '/:shortCode',
    validateHandler(getShortUrlSchema, 'params'),
    validateHandler(updateShortUrlSchema, 'body'),
    async (req, res, next) => {
        try {
            const { shortCode } = req.params;
            const { url } = req.body;
            const updatedUrl = await service.update(shortCode, url);

            res.status(200).json(updatedUrl);
        } catch (err) {
            next(err);
        }
    },
);

export default router;
