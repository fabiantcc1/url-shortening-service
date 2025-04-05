import Joi from 'joi';
import { config } from '.././config/config.js';

const url = Joi.string().required();

export const createShortUrlSchema = Joi.object({
    url: url.uri({
        scheme: config.env === 'development' ? ['http', 'https'] : ['https'],
    }),
});
