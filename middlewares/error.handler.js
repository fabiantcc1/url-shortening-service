import { config } from '../config/config';
import { isBoom } from '@hapi/boom';

export function logError(err, req, res, next) {
    const timestamp = new Date().toISOString();
    const path = req.originalUrl;
    const method = req.method;
    const ip = req.ip;
    const userAgent = req.get('user-agent');

    // Determine error details based on error type
    let errorDetails = {};

    if (isBoom(err)) {
        errorDetails = {
            type: 'Boom Error',
            statusCode: err.output.statusCode,
            message: err.message,
            ...(err.data && { data: err.data }),
            ...(err.output.payload && { payload: err.output.payload }),
        };
    } else {
        errorDetails = {
            type: 'Standard Error',
            statusCode: err.statusCode || 500,
            message: err.message || 'Internal Server Error',
            ...(err.details && { details: err.details }),
            ...(err.code && { code: err.code }),
        };
    }

    // Log error details in a structured format
    console.error({
        timestamp,
        level: 'ERROR',
        method,
        path,
        ip,
        userAgent,
        ...errorDetails,
        stack: err.stack,
    });

    next(err);
}

export function errorHandler(err, req, res, next) {
    // Check if the error is a Boom error
    if (isBoom(err)) {
        const { statusCode, payload } = err.output;

        // Prepare error response
        const errorResponse = {
            status: 'error',
            statusCode,
            ...payload,
            ...(config.env === 'development' && { stack: err.stack }),
        };

        return res.status(statusCode).json(errorResponse);
    }

    // Handle standard errors
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
