import { Router } from 'express';
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
