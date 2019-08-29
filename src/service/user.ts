import User from '../entities/user';

export const createUser = async (user: User) => {
    await user.save();
    return user;
};

export default {
    createUser
};
