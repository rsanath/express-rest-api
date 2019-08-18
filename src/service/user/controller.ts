import User from '../../entities/user';

const createUser = async (user: User) => {
    await user.save();
    return user;
};

const loginUser = (email: string, password: string) => {
    return email && password;
};

export default {
    createUser,
    loginUser
};
