import express from 'express';
import { ShortenService } from '../services/shorten.service.js';

const router = express.Router();
const service = new ShortenService();

router.post('/', async (req, res, next) => {
    try {
        const { url } = req.body;
        const shortUrl = await service.create(url);

        res.status(201).json(shortUrl);
    } catch (error) {
        next(error);
    }
});

export default router;
