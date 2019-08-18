import request from 'supertest';
import { Connection } from 'typeorm';
import router from '../../router';
import { getConnection } from '../../db';
import User from '../../entities/user';
import userControler from './controller';

describe('user endpoint', () => {
    let db: Connection;

    beforeAll(async () => {
        db = await getConnection();
    });

    afterEach(async () => {
        await User.clear();
    });

    afterAll(async () => {
        await db.close();
    });

    describe('POST /login', () => {
        it('should respond 422 for missing credentials', async done => {
            const response = await request(router).post('/api/v1/login');
            expect(response.status).toEqual(422);
            done();
        });

        it('should response 422 for incorrect email address', async done => {
            const response = await request(router)
                .post('/api/v1/login')
                .send({
                    email: 'invalid email@test.com',
                    password: 'password'
                });
            expect(response.status).toEqual(422);
            done();
        });
    });

    describe('POST /user', () => {
        it('should respond 422 for invalid body', async done => {
            userControler.createUser = jest
                .fn()
                .mockResolvedValue(() => console.log('Mock function called'));

            const response = await request(router).post('/api/v1/user');
            expect(response.status).toEqual(422);
            done();
        });
    });
});
