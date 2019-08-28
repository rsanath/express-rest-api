import { Router, Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import config from '../config';
import HttpError from '../errors/http-error';
import cors from 'cors';
import parser from 'body-parser';
import morgan from 'morgan';

/**
 * Adds a middleware to handle Cross-origin resource sharing
 *
 * @param router
 */
export const handleCors = (router: Router) =>
    router.use(cors({ credentials: true, origin: true }));

/**
 * Adds a middleware to [arse incoming request bodies
 * before handling, available under the req.body property.
 *
 * @param router
 */
export const parseRequestBody = (router: Router) => {
    router.use(parser.urlencoded({ extended: true }));
    router.use(parser.json());
};

/**
 * Adds a middleware to log all incoming request
 *
 * @param route
 */
export const logRequest = (router: Router) => {
    const format = config.isProduction ? 'tiny' : 'dev';
    router.use(morgan(format));
};

/**
 * Validates the incoming request.
 *
 * If all validations are passed proceeds to the next middlewate in chain
 * otherwise throws an HttpError.
 *
 * @param validations The list of conditions to validate
 *
 * @returns A Middleware that will handle the validation
 */
export const validate = (...validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        const message = 'Required fields are missing or invalid.';
        const error = new HttpError(422, message);
        next(error);
    };
};
