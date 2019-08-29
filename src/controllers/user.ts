import { Request, Response, NextFunction } from 'express';
import { plainToClass, classToPlain } from 'class-transformer';
import User from '../entities/user';
import HttpError from '../errors/http-error';
import * as userService from '../service/user';

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const params: User = plainToClass(User, req.body);
    try {
        const user = await userService.createUser(params);
        res.status(201).json(classToPlain(user));
    } catch (e) {
        return next(new HttpError(500, e.message));
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    res.sendStatus(200);
};
