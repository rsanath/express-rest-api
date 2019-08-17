import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { body, validationResult } from 'express-validator';
import { loginUser } from './controller';

// MOCKING DB just for test
let users = [
    {
        id: 1,
        username: 'test',
        password: 'asdf123'
    },
    {
        id: 2,
        username: 'test2',
        password: 'asdf12345'
    }
];

export default [
    {
        path: '/login',
        method: 'post',
        handler: [
            body('email').isEmail(),
            body('password').isLength({ min: 6, max: 28 }),

            async (req: Request, res: Response, next: NextFunction) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    console.log(errors.array());
                    return next(createHttpError(422, errors.array()));
                }
                const { email, password } = req.body;
                return await loginUser(email, password);
            }
        ]
    }
];
