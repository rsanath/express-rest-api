import { getConnection } from '../db';
import { Connection } from 'typeorm';
import User from './user';

describe('User entity', () => {
    let db: Connection;

    beforeEach(async done => {
        db = await getConnection();
        done();
    });

    afterEach(async done => {
        await User.clear();
        await db.close();
        done();
    });

    const getJohn = () => {
        const john = new User();
        john.firstName = 'John';
        john.lastName = 'Doe';
        john.emailAddress = 'john@test.com';
        john.encryptedPassword = 'password';
        return john;
    };

    it('should create a row in database table', async () => {
        const user = getJohn();
        await user.save();

        expect(user.id).toBeTruthy();
    });

    it('should hash password on insert', async () => {
        const user = getJohn();
        const passwordBeforeSave = user.encryptedPassword;
        await user.save();

        expect(user.encryptedPassword).not.toEqual(passwordBeforeSave);
    });

    it('should hash password on update only if password is changed', async () => {
        const user = getJohn();
        await user.save();

        const encryptedPasswordBeforeUpdate = user.encryptedPassword;

        // when password is not changed
        user.emailAddress = 'new@email.address';
        await user.save();
        expect(user.encryptedPassword).toEqual(encryptedPasswordBeforeUpdate);

        // when password is changed
        user.encryptedPassword = 'my-new-password';
        await user.save();
        expect(user.encryptedPassword).not.toEqual(
            encryptedPasswordBeforeUpdate
        );
    });
});
