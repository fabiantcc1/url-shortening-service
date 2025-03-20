import express from 'express';
import shortenRouter from './shorten.route.js';

function routerApi(app) {
    const routerV1 = express.Router();

    app.use('/api/v1', routerV1);
    routerV1.use('/shorten', shortenRouter);
}

export default routerApi;
