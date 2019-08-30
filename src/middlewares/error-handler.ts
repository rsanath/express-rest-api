import { Request, Response, NextFunction, Router } from 'express';
import ErrorResponse from '../models/error-response';
import HttpError from '../errors/http-error';
import config from '../config';

// this is the last middleware and hence is the right place to handle
// 404 error
const handle404Error = (router: Router) => {
    router.use((req: Request, res: Response, next: NextFunction) => {
        throw new HttpError(404, 'Method not found.');
    });
};

const handleClientError = (router: Router) => {
    router.use(
        (error: Error, req: Request, res: Response, next: NextFunction) => {
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
        }
    );
};

// Sends the stack trace of the error for easier debugging
const handleServerError = (router: Router) => {
    router.use(
        (error: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(error);
            if (config.isProduction) {
                const response: ErrorResponse = {
                    message: error.message
                };
                res.status(500).json(response);
            } else {
                res.status(500).json(error.stack);
            }
        }
    );
};

export default [handle404Error, handleClientError, handleServerError];
