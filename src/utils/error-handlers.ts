import { Response, NextFunction } from 'express';
import createHttpError, { HttpError } from 'http-errors';

// throw NotFound error and let the error handler take care of it
export const notFoundError = () => {
    throw createHttpError(404, 'Method not found.');
};

// treats non 5XX errors as client errors
export const clientError = (err: Error, res: Response, next: NextFunction) => {
    if (err instanceof HttpError && err.statusCode < 500) {
        console.warn(err);
        res.status(err.statusCode).send(err.message);
    } else {
        next(err);
    }
};

// We probably don't want to provide a lot of information about the error
// to the client in production.
export const serverError = (err: Error, res: Response, next: NextFunction) => {
    console.error(err);
    if (process.env.NODE_ENV === 'production') {
        res.status(500).send('Internal Server Error');
    } else {
        res.status(500).send(err.stack);
    }
};
