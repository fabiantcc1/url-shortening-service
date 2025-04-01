import { config } from '../config/config';

export function logError(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const timestamp = new Date().toISOString();
    const path = req.originalUrl;
    const method = req.method;

    // Log error details in a structured format
    console.error({
        timestamp,
        level: 'ERROR',
        statusCode,
        message,
        path,
        method,
        stack: err.stack,
        ...(err.details && { details: err.details }),
    });

    next(err);
}

export function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Prepare error response
    const errorResponse = {
        status: 'error',
        statusCode,
        message,
        ...(config.env === 'development' && { stack: err.stack }),
    };

    // Send error response
    res.status(statusCode).json(errorResponse);
}
