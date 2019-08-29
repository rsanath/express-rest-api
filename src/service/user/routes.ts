import { Request, Response, NextFunction } from 'express';
import { plainToClass, classToPlain } from 'class-transformer';
import userController from './controller';
import User from '../../entities/user';
import { createUserValidator, loginValidator } from '../../validations/user';
import HttpError from '../../errors/http-error';

export default [
    {
        path: '/user',
        method: 'post',
        handler: [
            createUserValidator,
            async (req: Request, res: Response, next: NextFunction) => {
                const params: User = plainToClass(User, req.body);
                try {
                    const user = await userController.createUser(params);
                    res.status(201).json(classToPlain(user));
                } catch (e) {
                    return next(new HttpError(500, e.message));
                }
            }
        ]
    },
    {
        path: '/login',
        method: 'post',
        handler: [
            loginValidator,
            async (req: Request, res: Response, next: NextFunction) => {
                const { email, password } = req.body;
                res.sendStatus(200);
            }
        ]
    }
];
