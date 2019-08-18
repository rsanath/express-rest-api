import { Router, Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import createHttpError from 'http-errors';
import cors from 'cors';
import parser from 'body-parser';
import morgan from 'morgan';

// CORS configuration
export const handleCors = (router: Router) =>
    router.use(cors({ credentials: true, origin: true }));

// Parse incoming request bodies before handling, available under the req.body property.
export const parseRequestBody = (router: Router) => {
    router.use(parser.urlencoded({ extended: true }));
    router.use(parser.json());
};

// Log all incoming request
export const logRequest = (router: Router) => {
    const { NODE_ENV } = process.env;
    const format = NODE_ENV === 'production' ? 'tiny' : 'dev';
    router.use(morgan(format));
};

export const validate = (...validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        const error = createHttpError(
            422,
            'Required fields are missing or invalid. Please refer the API docs'
        );
        next(error);
    };
};
