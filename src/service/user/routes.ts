import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { body } from 'express-validator';
import { plainToClass } from 'class-transformer';
import userController from './controller';
import User from '../../entities/user';
import { validate } from '../../middleware/common';

const { loginUser, createUser } = userController;

export default [
    {
        path: '/user',
        method: 'post',
        handler: [
            validate(
                body('emailAddress').isEmail(),
                body('password').isLength({ min: 6, max: 28 }),
                body('firstName').isLength({ min: 3, max: 20 }),
                body('lastName').isLength({ min: 3, max: 20 })
            ),
            async (req: Request, res: Response, next: NextFunction) => {
                const user: User = plainToClass(User, req.body);
                try {
                    createUser(user);
                } catch (e) {
                    return next(createHttpError(500, e));
                }
            }
        ]
    },
    {
        path: '/login',
        method: 'post',
        handler: [
            validate(
                body('email').isEmail(),
                body('password').isLength({ min: 6, max: 28 })
            ),
            async (req: Request, res: Response, next: NextFunction) => {
                const { email, password } = req.body;
                return await loginUser(email, password);
            }
        ]
    }
];
