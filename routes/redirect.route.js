import express from 'express';
import { ShortenService } from '../services/shorten.service.js';
import { validateHandler } from '../middleware/validator.handler.js';
import { getShortUrlSchema } from '../schemas/url.scheme.js';

const router = express.Router();
const service = new ShortenService();

// This is a catch-all route for redirects
// It will redirect to the original URL based on the short code provided in the URL
router.get(
    '/:shortCode',
    validateHandler(getShortUrlSchema, 'params'),
    async (req, res, next) => {
        try {
            const { shortCode } = req.params;
            const originalUrl = await service.redirect(shortCode);

            // Redirecting to the original URL with a 301 status code
            return res.redirect(301, originalUrl);
        } catch (err) {
            next(err);
        }
    },
);

export default router;
