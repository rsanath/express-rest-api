import { Request, Response, NextFunction, Router } from 'express';
import * as ErrorHandler from '../utils/error-handlers';

// this is the last middleware and hence is the right place to handle
// 404 error
const handle404Error = (router: Router) => {
    router.use((req: Request, res: Response, next: NextFunction) => {
        ErrorHandler.notFoundError();
    });
};

const handleClientError = (router: Router) => {
    router.use(
        (err: Error, req: Request, res: Response, next: NextFunction) => {
            ErrorHandler.clientError(err, res, next);
        }
    );
};

const handleServerError = (router: Router) => {
    router.use(
        (err: Error, req: Request, res: Response, next: NextFunction) => {
            ErrorHandler.serverError(err, res, next);
        }
    );
};

export default [handle404Error, handleClientError, handleServerError];
