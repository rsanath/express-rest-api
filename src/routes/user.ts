import { createUser, login } from '../controllers/user';
import { createUserValidator, loginValidator } from '../validators/user';

export default [
    {
        path: '/user',
        method: 'post',
        handler: [createUserValidator, createUser]
    },
    {
        path: '/login',
        method: 'post',
        handler: [loginValidator, login]
    }
];
