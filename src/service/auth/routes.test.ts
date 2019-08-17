import request from 'supertest';
import router from '../../router';

describe('authentication', () => {
    it('should respond 422 for missing credentials', async () => {
        const response = await request(router).post('/api/v1/login');
        expect(response.status).toEqual(422);
    });

    it('should response 422 for incorrect email address', async done => {
        const response = await request(router)
            .post('/api/v1/login')
            .send({ email: 'invalid email@test.com', password: 'password' });
        expect(response.status).toEqual(422);
        done();
    });
});
