import * as userController from '../controllers/user';
import { createUserValidator, loginValidator } from '../validators/user';

export default [
    {
        path: '/user',
        method: 'post',
        handler: [createUserValidator, userController.createUser]
    },
    {
        path: '/login',
        method: 'post',
        handler: [loginValidator, userController.login]
    }
];
