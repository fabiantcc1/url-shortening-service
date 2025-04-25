import express from 'express';
import shortenRouter from './shorten.router.js';
import redirectRouter from './redirect.router.js';

function routerApi(app) {
    const routerV1 = express.Router();

    app.use('/api/v1', routerV1);
    routerV1.use('/shorten', shortenRouter);

    // Route catch-all for redirects
    app.use('/', redirectRouter);
}

export default routerApi;
