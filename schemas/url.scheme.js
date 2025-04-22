import Joi from 'joi';
import { config } from '.././config/config.js';

const url = Joi.string()
    .required()
    .uri({
        scheme: config.env === 'development' ? ['http', 'https'] : ['https'],
    });
const shortCode = Joi.string().required().min(8).max(8);

export const createShortUrlSchema = Joi.object({
    url,
});

export const getShortUrlSchema = Joi.object({
    shortCode,
});

export const updateShortUrlSchema = Joi.object({
    shortCode,
    url,
});
