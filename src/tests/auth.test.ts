import config from '../config';
import User from '../entities/user';
import { generateToken, verifyToken } from '../middleware/auth';

describe('JWT authentication', () => {
    describe('Token verification', () => {
        const payload = { userId: 10 };
        const token = generateToken(payload);

        it('should decode and return the payload for a valid token', async () => {
            const payload = await verifyToken(token);
            expect(payload.userId).toEqual(10);
        });
    });
});
