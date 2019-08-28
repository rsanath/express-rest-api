import { Response, NextFunction } from 'express';
import config from '../config';
import ErrorResponse from '../models/error-response';
import HttpError from '../errors/http-error';

// throw NotFound error and let the error handler take care of it
export const notFoundError = () => {
    throw new HttpError(404, 'Method not found.');
};

// treats non 5XX errors as client errors
export const clientError = (
    error: Error,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof HttpError && error.statusCode < 500) {
        console.warn(error);
        const response: ErrorResponse = {
            message: error.message,
            errors: error.errors
        };
        res.status(error.statusCode).json(response);
    } else {
        next(error);
    }
};

// We probably don't want to provide a lot of information about the error
// to the client in production mode.
export const serverError = (
    error: Error,
    res: Response,
    next: NextFunction
) => {
    console.error(error);
    if (config.isProduction) {
        const response: ErrorResponse = {
            message: error.message
        };
        res.status(500).json(response);
    } else {
        res.status(500).json(error.stack);
    }
};
