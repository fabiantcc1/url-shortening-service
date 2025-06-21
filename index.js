import express from 'express';
import routerApi from './routes/index.js';
import { config } from './config/config.js';
import { errorHandler, logError } from './middlewares/error.handler.js';

const app = express();
const port = config.port;

app.use(express.json());

routerApi(app);

app.use(logError);
app.use(errorHandler);

app.listen(port, () => {
    if (config.env === 'development') {
        console.log(`Server is running at http://localhost:${port}`);
    } else {
        console.log(`Server is running`);
    }
});
