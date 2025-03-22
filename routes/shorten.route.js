import { config } from '../config/config.js';
import express from 'express';
import { nanoid } from 'nanoid';

const router = express.Router();

router.post('/', (req, res) => {
    const body = req.body;

    const urlCode = nanoid(8);
    const shortUrl = `${config.url}/${urlCode}`;

    res.json({
        id: 1,
        url: shortUrl,
        shortCode: urlCode,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
});

export default router;
