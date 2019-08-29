import { body } from 'express-validator';
import { validate } from '../middlewares/common';

export const createUserValidator = validate(
    body('emailAddress').isEmail(),
    body('password').isLength({ min: 6, max: 28 }),
    body('firstName').isLength({ min: 3, max: 20 }),
    body('lastName')
        .optional()
        .isLength({ min: 3, max: 20 })
);

export const loginValidator = validate(
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 28 })
);
