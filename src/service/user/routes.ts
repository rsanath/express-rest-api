import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { plainToClass, classToPlain } from 'class-transformer';
import userController from './controller';
import User from '../../entities/user';
import { validate } from '../../middleware/common';
import HttpError from '../../errors/http-error';

export default [
    {
        path: '/user',
        method: 'post',
        handler: [
            validate(
                body('emailAddress').isEmail(),
                body('password').isLength({ min: 6, max: 28 }),
                body('firstName').isLength({ min: 3, max: 20 }),
                body('lastName')
                    .optional()
                    .isLength({ min: 3, max: 20 })
            ),
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
            validate(
                body('email').isEmail(),
                body('password').isLength({ min: 6, max: 28 })
            ),
            async (req: Request, res: Response, next: NextFunction) => {
                const { email, password } = req.body;
                res.sendStatus(200);
            }
        ]
    }
];
